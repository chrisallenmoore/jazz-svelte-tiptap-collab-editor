<script lang="ts">
	import JazzSyncTiptapEditor from '$lib/components/JazzSyncTiptapEditor.svelte';
	import { getContext } from 'svelte';
	import type { AccountCoState } from 'jazz-tools/svelte';
	import type { JazzExampleAccount } from '$lib/schema';

	// Get the account state from layout context
	const me =
		getContext<
			AccountCoState<typeof JazzExampleAccount, { root: { collabDocument: true }; profile: true }>
		>('jazz-account');
</script>

<header class="my-4 text-center">
	<h1 class="mb-2 text-4xl font-bold">Collaborative RichText Editor</h1>
	<p class="text-lg">Powered by SvelteKit, Jazz and Tiptap for real-time collaborative editing</p>
</header>

<!-- Display word count from the collaborative document -->
<p class="mb-4 text-center text-lg">
	Word count: {me.current?.root?.collabDocument?.wordCount ?? 0}
</p>
<section class="mx-auto max-w-3xl">
	<JazzSyncTiptapEditor value={me.current?.root?.collabDocument} />
</section>
