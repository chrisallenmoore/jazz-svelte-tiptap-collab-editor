# Collab Editor - Jazz + SvelteKit + Tiptap Demo

A demonstration project showing how to integrate Jazz's real-time collaboration with SvelteKit and Tiptap for building collaborative rich text editors. This app enables multiple users to edit documents simultaneously with live synchronization, rich text formatting, and word count tracking. Wanna see it in action? Simply open up an additional browser tab and watch the text and word count sync in real-time.

## What This Demo Shows

This project demonstrates how to integrate three powerful technologies:

- **Jazz**: Real-time collaboration framework for decentralized, peer-to-peer synchronization
- **SvelteKit**: Modern web framework for building fast, scalable applications
- **Tiptap**: Headless rich text editor with extensive plugin ecosystem

### Key Features Demonstrated

- **Real-time Collaborative Editing**: Multiple users can edit the same document simultaneously
- **Document Title Editing**: Collaborative title input that syncs across all users in real-time
- **Rich Text Formatting**: Bold, italic, and strikethrough formatting with bubble menu
- **Live Word Count**: Automatic word count updates as you type
- **Jazz Schema Integration**: Using Jazz's CoMap and CoRichText for data modeling
- **Tiptap Extensions**: Integrating JazzSyncExtension with Tiptap for seamless sync
- **Svelte Reactivity**: Leveraging Svelte's reactive system with Jazz's CoState
- **TypeScript Integration**: Fully typed codebase for better development experience

## Tech Stack

- **Framework**: SvelteKit - Modern web framework for building fast, scalable applications
- **Rich Text Editor**: Tiptap - Headless editor framework with extensive plugin ecosystem
- **Collaboration Engine**: Jazz Tools - Decentralized real-time collaboration library
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **Build Tool**: Vite - Fast build tool and development server
- **Language**: TypeScript - Type-safe JavaScript

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd collab-editor
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Environment Setup**:
   - The project includes a `.env` file with a development API key for Jazz tools
   - `PUBLIC_JAZZ_API_KEY`: Pre-configured development key for Jazz collaboration services
   - The app uses Jazz's built-in authentication, so no additional user setup is required
   - For production deployment, you may need to obtain your own Jazz API key from [jazz.tools](https://jazz.tools)
   - More information on setting up Jazz and getting a free Jazz API key can be found at [https://jazz.tools/docs/svelte/project-setup](https://jazz.tools/docs/svelte/project-setup)

   **Example `.env` file**:

   ```env
   PUBLIC_JAZZ_API_KEY="your-jazz-api-key-here"
   ```

## Development

### Start the Development Server

```sh
npm run dev
```

This will start the development server at `http://localhost:5173`. The app will automatically reload when you make changes to the code.

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript and Svelte checks
- `npm run format` - Format code with Prettier

## Usage

1. **Open the Application**: Navigate to `http://localhost:5173` in your browser
2. **Edit Document Title**: Enter or modify the document title in the input field at the top
3. **Start Editing**: Begin typing in the editor area
4. **Auto Sync**: Open up a second browser tab to see real-time synchronization in action
5. **Formatting**: Select text to see the bubble menu with formatting options
6. **Word Count**: View the live word count displayed below the editor

### Key Components

- **JazzSyncTiptapEditor**: The main collaborative editor component that integrates Tiptap with Jazz's real-time sync
- **AccountProvider**: Manages user authentication and Jazz account state
- **Schema**: Defines the data structure for collaborative documents using Jazz's schema system

## Project Structure

```
src/
├── app.css                 # Global styles and Tailwind imports
├── app.d.ts               # TypeScript declarations
├── app.html               # Main HTML template
├── lib/
│   ├── components/
│   │   ├── AccountProvider.svelte    # Jazz account management
│   │   └── JazzSyncTiptapEditor.svelte # Collaborative editor
│   ├── schema.ts          # Jazz data schema definitions
│   └── index.ts           # Library exports
└── routes/
    ├── +layout.svelte     # App layout with providers
    └── +page.svelte       # Main page
```

## How It Works

### Architecture Overview

This demo showcases the integration of Jazz, SvelteKit, and Tiptap through several key components:

### Collaboration Flow

1. **User Authentication**: Jazz handles user accounts and authentication automatically
2. **Document Schema**: Uses Jazz's schema system to define collaborative data structures:
   - `CollabDocument`: Contains title, content (CoRichText), and wordCount
   - `JazzExampleAccount`: Account schema with root data and public profile
3. **Real-time Sync**: JazzSyncExtension bridges Tiptap and Jazz's CoRichText for live synchronization
4. **State Management**: Svelte's reactive system combined with Jazz's CoState for seamless UI updates

### Key Integration Points

#### JazzSyncTiptapEditor Component

The main editor component demonstrates:

- **Tiptap Initialization**: Configured with StarterKit, BubbleMenu, CharacterCount, and Placeholder
- **Jazz Integration**: Uses `JazzSyncExtension.configure({ coRichText: value.content })`
- **Reactive Updates**: Leverages Svelte's `$effect` for managing editor lifecycle
- **Word Count Sync**: Updates collaborative document's word count on every transaction
- **Memory Management**: Proper cleanup to prevent memory leaks

#### Schema Definition (`schema.ts`)

Shows how to define collaborative data structures:

```typescript
export const CollabDocument = co.map({
	title: z.string(),
	content: co.richText(), // Collaborative rich text
	wordCount: z.number()
});
```

#### Account Management

Demonstrates Jazz's account system with migration for initializing default data.

### Learning Points

- How to set up Jazz with SvelteKit
- Integrating Tiptap with Jazz's real-time sync
- Managing collaborative state with Svelte reactivity
- Defining schemas for collaborative data
- Handling editor lifecycle and cleanup
- Implementing real-time features like live word count

## Building for Production

```sh
npm run build
```

This creates an optimized production build in the `build/` directory. The build process:

- Compiles Svelte components
- Bundles JavaScript and CSS
- Optimizes assets for performance
- Generates static files for deployment

### Deployment

The app can be deployed to any static hosting service or platform that supports SvelteKit:

- **Vercel**: Automatic deployment with `vercel` CLI
- **Netlify**: Drag-and-drop deployment or CLI
- **Railway**: Full-stack deployment with database support
- **Static Hosts**: GitHub Pages, Surge, etc.

For deployment to different platforms, you may need to install appropriate adapters:

```sh
npm install @sveltejs/adapter-vercel
# or
npm install @sveltejs/adapter-netlify
```

## Using This Demo as a Starting Point

This project serves as a reference implementation for building collaborative applications with Jazz, SvelteKit, and Tiptap. Here's how to adapt it for your own projects:

### Customization Ideas

- **Add More Tiptap Extensions**: Integrate tables, code blocks, or custom formatting
- **Multiple Documents**: Allow users to create and switch between different collaborative documents
- **User Presence**: Show which users are currently editing and their cursors
- **Version History**: Implement document versioning and undo/redo functionality
- **Comments System**: Add collaborative comments and annotations
- **File Attachments**: Support for collaborative file sharing

### Key Files to Study

- `src/lib/components/JazzSyncTiptapEditor.svelte`: Main editor integration
- `src/lib/schema.ts`: Data modeling with Jazz schemas
- `src/routes/+page.svelte`: Page-level integration
- `src/routes/+layout.svelte`: Account provider setup

## Contributing

We welcome contributions to improve this demo! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and ensure the app still works
4. **Commit your changes**: `git commit -m 'Add some feature'`
5. **Push to the branch**: `git push origin feature/your-feature-name`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style (Prettier formatting)
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Keep the demo focused on showcasing Jazz + SvelteKit + Tiptap integration

## Troubleshooting

### Common Issues

- **Editor not loading**: Ensure Jazz account is properly initialized
- **Collaboration not working**: Check network connectivity and Jazz configuration
- **Styling issues**: Verify Tailwind CSS is properly configured

### Debug Mode

Enable debug logging by setting `DEBUG=jazz:*` in your environment variables.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Resources

- **[Jazz Documentation](https://jazz.tools/docs)**: Learn more about Jazz's collaboration framework
- **[SvelteKit Docs](https://kit.svelte.dev/docs)**: Official SvelteKit documentation
- **[Tiptap Documentation](https://tiptap.dev/docs)**: Rich text editor guides and API reference
- **[Jazz + Svelte Setup Guide](https://jazz.tools/docs/svelte/project-setup)**: Step-by-step setup instructions

## Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) - The web framework
- [Jazz](https://jazz.tools/) - Real-time collaboration framework
- [Tiptap](https://tiptap.dev/) - Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check the documentation for [Jazz](https://jazz.tools/docs), [SvelteKit](https://kit.svelte.dev/docs), and [Tiptap](https://tiptap.dev/docs)
- Join the community discussions
