# Jazz Tooling Notes

## API Keys & Products
- Jazz API keys are Base64 strings split by `|`. The first segment (`co_…`) is the product ID. Keys sharing that segment target the same product and therefore the same account graph.
- Example: `Y29fekg3WEs0...=` → `co_zH7XK4oQhtotXug7DUXJEXsmKW4|co_zbu7iVPfMqjLdkUxRKNPortU772|co_zQacSsrxUUrp74T4AjkrCbBMsBe` (product `co_zH7XK4oQhtotXug7DUXJEXsmKW4`).
- To isolate data between projects, use keys whose first segment differs. That means creating a separate product (or a new team) in the Jazz dashboard.
- Example: `Y29fektVN3Nj...=` → `co_zKU7scr97iQGgsKFiTThRvCkxDW|...` (different product, separate data graph).

## Account Data Separation
- Even with different API keys, apps that log in to the same account will share their `root` data. Namespace root objects (`root.collabEditor`, `root.exampleApp`, etc.) if one product must host multiple experiences.
- Example: `account.$jazz.set('root', { collabEditor: {...}, exampleApp: {...} })`.
- Making a profile `Group` public (`group.makePublic()`) exposes every field in that group to the entire Jazz network.
- Example: remove `group.makePublic()` or replace with `group.shareWith(accountID, "writer")` to limit visibility.

## Local Auth Storage
- `<JazzSvelteProvider>` defaults to storing auth secrets under `localStorage["jazz-logged-in-secret"]`. Multiple apps on the same origin will reuse that entry and load the same account.
- Example: `localStorage.getItem("jazz-logged-in-secret")` returns the serialized credentials.
- Provide a distinct `authSecretStorageKey` prop per app to keep sessions isolated.
- Example: `<JazzSvelteProvider authSecretStorageKey="collab-editor-auth" ...>` vs. `<JazzSvelteProvider authSecretStorageKey="example-auth" ...>` in the second app.

## Sync Behavior
- Using a `wss://cloud.jazz.tools/?key=…` peer syncs all changes to Jazz Cloud, even from `localhost`.
- Notes: `sync.when` defaults to `'always'` when you supply a `peer`, so `const sync = { peer: ... };` is enough unless you intentionally want `'signedUp'` or `'never'`.
- Example: `const sync = { peer: \`wss://cloud.jazz.tools/?key=${PUBLIC_JAZZ_API_KEY}\` };`.
- Anonymous auth issues a fresh account per browser profile. Copying the saved auth secret (from localStorage) to another browser is a quick way to force them into the same account for testing.
- Example: copy the JSON blob from `localStorage["collab-editor-auth"]` in Browser A to Browser B, then refresh.
- For real sharing, invite collaborators or otherwise distribute the same account credentials.
- Example: call `group.createInvite("writer")` and send the `#/invite/...` link to the other user.
