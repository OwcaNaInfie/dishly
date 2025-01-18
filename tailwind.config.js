module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flyonui/dist/js/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin")
  ],
  flyonui: {
    themes: [
      {
        mytheme: {
          "primary": "#9f00ff",
          "primary-content": "#ebd9ff",
          "secondary": "#00efe7",
          "secondary-content": "#001413",
          "accent": "#3f2fff",
          "accent-content": "#d1dcff",
          "neutral": "#181818",
          "neutral-content": "#cbcbcb",
          "base-100": "#fffedf",
          "base-200": "#deddc2",
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
