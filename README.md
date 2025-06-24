
# Reactify - A Universal React Component Library

[![npm version](https://img.shields.io/npm/v/@reactify/components.svg?style=flat)](https://www.npmjs.com/package/@reactify/components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Reactify provides a collection of reusable, unstyled, and accessible UI components designed to accelerate your development workflow within the React ecosystem. Built with adaptability in mind, it's perfect for creating consistent user interfaces in any React-based project, including Next.js, Vite, or Create React App.

## Key Features

-   **Core Components**: A rich library of foundational UI components like buttons, inputs, modals, and advanced data tables.
-   **React Ecosystem Ready**: Works seamlessly in any React environment. The components are bundled as a standard library.
-   **Flexible Theming**: Easily customize the look and feel using CSS variables to match your brand identity.
-   **Accessibility First**: Built with WAI-ARIA standards in mind, ensuring all components are usable by everyone, with full keyboard navigation and screen reader support.
-   **Developer Experience**: Built with TypeScript for a clean, predictable, and robust development experience.

## Installation

To use Reactify components in your project, install the package from npm:

```bash
npm install @reactify/components
```

Or, if you prefer using Yarn:

```bash
yarn add @reactify/components
```

## Peer Dependencies

Reactify relies on several peer dependencies that you need to have installed in your project. These are not bundled with the library to avoid version conflicts in your application.

```json
"peerDependencies": {
  "lucide-react": "^0.x",
  "react": "^18.x",
  "react-dom": "^18.x"
}
```

Please ensure these are included in your project's `package.json`.

## Basic Usage

Import and use components directly in your React application. Most components are designed to be intuitive and require minimal configuration.

```jsx
import { ReactifyButton, ReactifyInput } from '@reactify/components';

function MyForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <label htmlFor="name">Name</label>
      <ReactifyInput id="name" placeholder="Enter your name" />
      
      <ReactifyButton 
        variant="primary" 
        onClick={() => alert('Form submitted!')}
      >
        Submit
      </ReactifyButton>
    </form>
  );
}
```

## Theming

Reactify is built on top of **Tailwind CSS** and uses **CSS variables** for theming, making it incredibly easy to customize.

To theme the components, set up a global stylesheet (e.g., `src/styles/globals.css`) in your project and define the theme variables inside the `:root` selector. The components will automatically adapt to these values.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Change these to your brand colors (values are in HSL format) */
    --primary: 209 100% 60%;
    --primary-foreground: 210 40% 98%;

    --accent: 266 100% 46%;
    --accent-foreground: 210 40% 98%;

    --background: 210 29% 95%;
    --foreground: 222.2 84% 4.9%;
    
    /* ...and so on for other theme variables like --card, --border, --destructive, etc. */
  }
}
```

You will also need to configure Tailwind CSS in your project to use these variables.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
