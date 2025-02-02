module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flyonui/dist/js/*.js", "./node_modules/notyf/**/*.js"],
  theme: {
    fontFamily: {
      'poppins': ['"poppins"', 'ui-sans-serif'],
      'fascinate': ['"fascinate"', 'ui-sans-serif'],
      'slab': ['"slab"', 'ui-sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin")
  ],
  flyonui: {
    vendors: true,
    themes: [
      {
        mytheme: {
          "accent": "#9f00ff",
          "accent-content": "#ebd9ff",
          "secondary": "#ffd300",
          "secondary-content": "#001413",
          "primary": "#3f2fff",
          "primary-content": "#d1dcff",
          "neutral": "#181818",
          "neutral-content": "#cbcbcb",
          "base-100": "#fff0e5",
          "base-200": "#fff8f1",
          "base-300": "#bebda5",
          "base-content": "#161612",
          "info": "#006cc6",
          "info-content": "#d1e2f6",
          "success": "#00eba9",
          "success-content": "#00130a",
          "warning": "#ff9300",
          "warning-content": "#160800",
          "error": "#e20020",
          "error-content": "#ffd8d3"
        }
      }
    ]
  },
};
