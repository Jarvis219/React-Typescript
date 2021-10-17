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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}