module.exports = {
  purge: [
    './public/index.html',
    './src/*.tsx',
    './src/**/*.tsx',
    './src/**/**/*.tsx'
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['"Roboto Slab"', 'serif'],
      body: ['Roboto', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}