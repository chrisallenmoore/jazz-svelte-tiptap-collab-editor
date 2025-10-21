<script lang="ts">
	import JazzSyncTiptapEditor from '$lib/components/JazzSyncTiptapEditor.svelte';
	import { getContext } from 'svelte';
	import type { AccountCoState } from 'jazz-tools/svelte';
	import type { JazzCollabEditorAccount } from '$lib/schema';

	// Get the account state from layout context
	const me =
		getContext<
			AccountCoState<
				typeof JazzCollabEditorAccount,
				{ root: { collabDocument: true }; profile: true }
			>
		>('jazz-account');

	// Reactive title binding
	let title = $state('');
	$effect(() => {
		title = me.current?.root?.collabDocument?.title ?? '';
	});

	function updateTitle(newTitle: string) {
		if (me.current?.root?.collabDocument) {
			me.current.root.collabDocument.$jazz.set('title', newTitle);
		}
	}
</script>

<header class="my-4 px-1 text-center">
	<h1 class="mb-2 text-4xl font-bold">Collaborative RichText Editor</h1>
	<p class="text-lg">Powered by SvelteKit, Jazz and Tiptap for real-time collaborative editing</p>
</header>

<section class="mx-auto mb-4 max-w-3xl px-1">
	<input
		type="text"
		bind:value={title}
		oninput={(e) => updateTitle(e.currentTarget.value)}
		placeholder="Title..."
		class="prose w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl prose-gray placeholder:text-gray-400 placeholder:opacity-80 focus:ring-2 focus:ring-black focus:outline-none"
	/>
</section>

<section class="mx-auto max-w-3xl px-1">
	<JazzSyncTiptapEditor value={me.current?.root?.collabDocument} />
</section>

<!-- Display word count from the collaborative document -->
<p class="text-center text-lg">
	Word count: {me.current?.root?.collabDocument?.wordCount ?? 0}
</p>
