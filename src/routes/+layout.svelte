<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { JazzSvelteProvider } from 'jazz-tools/svelte';
	import { JazzCollabEditorAccount } from '$lib/schema';
	import { PUBLIC_JAZZ_API_KEY } from '$env/static/public';
	import AccountProvider from '$lib/components/AccountProvider.svelte';

	const apiKey = PUBLIC_JAZZ_API_KEY;
	let { children } = $props();
	const sync = { peer: `wss://cloud.jazz.tools/?key=${apiKey}`, when: 'always' };
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<JazzSvelteProvider
	{sync}
	AccountSchema={JazzCollabEditorAccount}
	authSecretStorageKey="jazz-svelte-tiptap-collab-editor-auth"
>
	<AccountProvider>
		{@render children?.()}
	</AccountProvider>
</JazzSvelteProvider>
