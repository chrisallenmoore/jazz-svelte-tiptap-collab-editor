<script lang="ts">
	import { AccountCoState } from 'jazz-tools/svelte';
	import { JazzCollabEditorAccount } from '$lib/schema';
	import { setContext } from 'svelte';

	let { children } = $props();

	// Create AccountCoState during component initialization when context is available
	const me = new AccountCoState(JazzCollabEditorAccount, {
		resolve: {
			root: {
				collabDocument: true
			},
			profile: {
				bio: true
			}
		}
	});

	// Share the account state with all child components
	setContext('jazz-account', me);
</script>

{@render children?.()}
