<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import { CharacterCount } from '@tiptap/extension-character-count';
	import { Placeholder } from '@tiptap/extension-placeholder';
	import { onDestroy } from 'svelte';
	import { JazzSyncExtension } from 'jazz-tools/tiptap';

	let { value }: { value: any } = $props();

	let element: HTMLElement | undefined;
	let editor = $state<Editor | undefined>(undefined);
	let currentCoRichTextId = $state<string | undefined>(undefined);

	/**
	 * Creates and initializes a new Tiptap editor instance with collaborative capabilities.
	 *
	 * Guard conditions prevent duplicate initialization:
	 * - Requires a valid CoRichText value
	 * - Skips if editor already exists
	 * - Requires DOM element to be available
	 *
	 * The editor is configured with:
	 * - StarterKit: Basic rich text editing features (bold, italic, lists, etc.)
	 * - JazzSyncExtension: Enables real-time collaboration by syncing with the CoRichText object
	 * - No initial content: The Jazz extension loads content from the CoRichText automatically
	 * - onTransaction callback: Updates word count in collaborative document on content changes, required by Tiptap API
	 */
	function initializeEditor() {
		if (!value || editor || !element) return;

		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: document.querySelector('.bubble-menu') as HTMLElement,
					shouldShow: ({ editor }) => {
						return !editor.state.selection.empty;
					}
				}),
				CharacterCount,
				Placeholder.configure({
					placeholder: 'Start writing...'
				}),
				// Jazz sync!
				JazzSyncExtension.configure({
					coRichText: (value as any)?.content
				}) as any
			],
			onTransaction: ({ editor }) => {
				// Update word count in collaborative document on every transaction (content change)
				if (value && editor.storage?.characterCount) {
					try {
						(value as any).$jazz.set('wordCount', editor.storage.characterCount.words());
					} catch (error) {
						console.warn('Failed to update word count:', error);
					}
				}
			}
		});
	}

	/**
	 * Clean up the Tiptap editor instance to prevent memory leaks and remove event listeners.
	 * Called when the CoRichText value changes or the component is destroyed.
	 * Also resets the tracking ID to ensure proper re-initialization.
	 */
	function destroyEditor() {
		if (editor) {
			editor.destroy();
			editor = undefined;
		}
		currentCoRichTextId = undefined;
	}

	/**
	 * Reactive effect that manages editor lifecycle based on CoRichText changes.
	 * The CoRichText object reference stays stable during editing - only the ID changes
	 * when a completely different collaborative document is passed. This prevents
	 * unnecessary editor destruction/recreation during normal typing.
	 */
	$effect(() => {
		const target = element;
		const coValue = (value as any)?.content;
		const newId = (coValue as any)?.$jazz?.id as string | undefined;

		if (!coValue || !target) {
			if (editor) {
				destroyEditor();
			}
			return;
		}

		if (editor && currentCoRichTextId === newId) {
			return;
		}

		if (editor) {
			destroyEditor();
		}

		initializeEditor();
		currentCoRichTextId = newId;
	});

	/**
	 * Component lifecycle hook that runs when the component is about to be unmounted.
	 * Ensures the Tiptap editor is properly cleaned up to prevent memory leaks.
	 */
	onDestroy(() => {
		destroyEditor();
	});
</script>

<div class="mx-auto flex w-full flex-1 flex-col">
	<!-- Bubble Menu - Always rendered for Tiptap to find it -->
	<div class="bubble-menu invisible">
		<div class="flex gap-1 rounded-lg border border-gray-300 bg-white p-1 shadow-lg">
			<button
				class="rounded px-2 py-1 text-sm hover:bg-gray-100 {editor?.isActive('bold')
					? 'bg-blue-100'
					: ''}"
				onclick={() => editor?.chain().focus().toggleBold().run()}
				title="Bold"
			>
				<strong>B</strong>
			</button>
			<button
				class="rounded px-2 py-1 text-sm hover:bg-gray-100 {editor?.isActive('italic')
					? 'bg-blue-100'
					: ''}"
				onclick={() => editor?.chain().focus().toggleItalic().run()}
				title="Italic"
			>
				<em>I</em>
			</button>
			<button
				class="rounded px-2 py-1 text-sm hover:bg-gray-100 {editor?.isActive('strike')
					? 'bg-blue-100'
					: ''}"
				onclick={() => editor?.chain().focus().toggleStrike().run()}
				title="Strikethrough"
			>
				<s>S</s>
			</button>
		</div>
	</div>
	<div bind:this={element} class="prose prose-2xl w-full max-w-none flex-1 overflow-auto"></div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(.tiptap.ProseMirror) {
		@apply h-[380px];
		@apply w-full;
		@apply overflow-y-scroll;
		@apply px-4;
		@apply border;
		@apply rounded-lg;
		@apply scroll-smooth;
		@apply border-gray-300;
	}

	/* Placeholder styling */
	:global(.tiptap.ProseMirror p.is-editor-empty:first-child::before) {
		@apply text-gray-400;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}

	/* Bubble menu positioning */
	.bubble-menu {
		position: absolute;
		z-index: 1000;
		/* display has to be set to hidden to make the bubble menu work */
		display: hidden;
	}

	:global(.bubble-menu[data-show='true']) {
		display: block;
	}
</style>
