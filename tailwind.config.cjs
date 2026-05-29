/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'editor-bg': '#1e1e1e',
                'editor-sidebar': '#252526',
                'editor-text': '#d4d4d4',
                'editor-keyword': '#569cd6',
                'editor-class': '#4ec9b0',
                'editor-variable': '#9cdcfe',
                'editor-string': '#ce9178',
                'editor-comment': '#6a9955',
                'editor-func': '#dcdcaa',
                'editor-number': '#b5cea8',
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'],
            },
        },
    },
    plugins: [],
}
