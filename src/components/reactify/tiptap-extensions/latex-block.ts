
import { Node, mergeAttributes } from '@tiptap/core';
import katex from 'katex';

export interface LatexBlockOptions {
  HTMLAttributes: Record<string, any>;
  // We can add more options like inline: boolean if we want to support inline LaTeX later
}

const LatexBlockNode = Node.create<LatexBlockOptions>({
  name: 'latexBlock',
  group: 'block',
  atom: true, // Behaves as a single, indivisible unit in the editor
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      latex: {
        default: '',
        // How to get the latex attribute when parsing HTML
        parseHTML: element => element.querySelector('span[data-latex]')?.getAttribute('data-latex') || element.getAttribute('data-latex-block-content'),
        // How to set the latex attribute when rendering HTML (not strictly needed here if using renderHTML for structure)
        // renderHTML: attributes => { ... } 
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-latex-block="true"]', // Recognizes this structure from input HTML
        // For backwards compatibility or other structures, you can add more rules
        // For example, if you just had <div data-latex-content="E=mc^2"></div>
        // getAttrs: (element: HTMLElement) => {
        //   return { latex: element.getAttribute('data-latex-content') }
        // }
      },
      // If content is directly in a pre tag
      {
        tag: 'pre[data-language="latex"]',
        getAttrs: (element: HTMLElement) => {
             return { latex: element.textContent }
        }
      }
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const latexContent = node.attrs.latex || '';
    let renderedHtml = '';
    try {
      renderedHtml = katex.renderToString(latexContent, {
        displayMode: true, // For block display
        throwOnError: false, // Don't crash editor on bad LaTeX
        output: 'html', // Ensure HTML output
      });
    } catch (e: any) {
      console.error('KaTeX rendering error:', e);
      renderedHtml = `<span class="text-destructive">Error rendering LaTeX: ${e.message}</span>`;
    }
    
    // This outer div is what TipTap manages as the node.
    // It should have 'data-latex-block="true"' to be recognized by parseHTML.
    // The raw LaTeX is stored in a hidden span for easy retrieval by parseHTML if needed.
    // The actual KaTeX render is put into a contenteditable=false div.
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 
        'data-latex-block': 'true', 
        class: 'latex-block-container not-prose' // `not-prose` to prevent Tailwind typography from messing with KaTeX
      }),
      // Store raw LaTeX in a hidden span, helpful for parseHTML to find it.
      ['span', { 'data-latex': latexContent, style: 'display:none;' }],
      // The div where KaTeX rendered output will go.
      // `contenteditable="false"` prevents direct editing of the rendered math.
      ['div', { class: 'latex-render-area', 'data-katex-render': 'true' , innerHTML: renderedHtml, contenteditable: 'false'}]
    ];
  },

  addCommands() {
    return {
      insertLatexBlock: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
      // updateLatexBlock is not strictly necessary if using updateAttributes directly
      // but can be a convenient alias.
      // updateLatexBlock: (attributes) => ({ commands }) => {
      //   return commands.updateAttributes(this.name, attributes);
      // }
    };
  },

  // Optional: Add input rules for convenience, e.g., typing $$...$$
  // addInputRules() {
  //   return [
  //     // Example: $$ latex $$ creates a latexBlock
  //     new InputRule({
  //       find: /\$\$(.+?)\$\$/,
  //       handler: ({ range, match, commands }) => {
  //         const latex = match[1];
  //         if (latex) {
  //           commands.deleteRange(range);
  //           commands.insertLatexBlock({ latex });
  //         }
  //       },
  //     }),
  //   ];
  // },
});

export default LatexBlockNode;
