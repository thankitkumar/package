
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/reactify/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Generate .d.ts files
  splitting: false,
  sourcemap: true,
  clean: true, // Clean output directory before build
  external: [
    'react', 
    'react-dom', 
    'lucide-react', 
    'recharts',
    '@tiptap/react',
    '@tiptap/pm',
    '@tiptap/starter-kit',
    'katex'
  ], // Externalize peer dependencies
  // tsup will automatically pick up tsconfig.json paths for aliases like @/*
  // Ensure your tsconfig.json's baseUrl and paths are set up if you use such aliases internally.
  // For Reactify components, we've updated them to use relative paths for utils and common-props.
});
