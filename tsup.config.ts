
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
    '@tiptap/react',
    '@tiptap/pm',
    '@tiptap/starter-kit',
    'katex'
  ], // Externalize peer dependencies
  // tsup will automatically pick up tsconfig.json paths for aliases like @/*
  // so we need to ensure component source files use relative paths.
});
