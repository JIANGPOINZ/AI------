export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: "readonly",
        Math: "readonly",
        navigator: "readonly",
        Object: "readonly",
        React: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
    },
  },
];
