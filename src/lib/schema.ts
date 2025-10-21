import { co, z, Group, CoRichText } from "jazz-tools";

/**
 * Dedicated collaborative document for rich text editing.
 * Uses CoRichText for real-time collaborative editing with Jazz sync.
 */
export const CollabDocument = co.map({
  title: z.string(),
  content: co.richText(), // Collaborative rich text content
  wordCount: z.number(), // Word count for the document content
});

/**
 * Private account root data structure.
 * Contains user's personal data that's not shared publicly.
 * Includes festival management, documents, and collaborative content.
 */
export const JazzCollabEditorAccountRoot = co.map({
  collabDocument: CollabDocument, // Real-time collaborative document
});

/**
 * Public user profile schema.
 * Contains user identity information visible to all Jazz users.
 * Made public so other users can see profile information in collaborative spaces.
 */
export const JazzCollabEditorProfile = co.profile({
  /**
   * Learn about CoValue field/item types here:
   * https://jazz.tools/docs/react/schemas/covalues#covalue-fielditem-types
   */
  name: z.string(),           // User's display name
  avatar: z.string().optional(), // Optional profile picture URL
  bio: co.richText(),         // Rich text biography/description

  // Add public fields here
});

/**
 * Main account schema combining private root data and public profile.
 * Uses migration to initialize default data for new accounts.
 */
export const JazzCollabEditorAccount = co
  .account({
    root: JazzCollabEditorAccountRoot,     // Private account data
    profile: JazzCollabEditorProfile,         // Public profile information
  })
  .withMigration((account) => {
    // Initialize private root data if it doesn't exist
    if (!account.$jazz.has('root')) {
      account.$jazz.set('root', {
        
        
        collabDocument: {
          title: '',
          content: CoRichText.create(
            '<p></p>',
          ),
          wordCount: 12, // Initialize with word count of the default content
        },


      });

    }

    // Initialize public profile if it doesn't exist
    if (!account.$jazz.has("profile")) {
      const group = Group.create();
      group.makePublic(); // Profile info is visible to everyone in the Jazz network

      account.$jazz.set(
        "profile",
        JazzCollabEditorProfile.create(
          {
            name: "Anonymous", // Default anonymous identity
            bio: CoRichText.create(
              "<p>A <strong>hu<em>man</strong></em>.</p>", // Default bio content
              group
            ),
          },
          group,
        ),
      );
    }
  });
