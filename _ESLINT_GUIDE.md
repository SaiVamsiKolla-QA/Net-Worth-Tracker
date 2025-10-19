# ESLint Configuration Guide

## What's in .eslintrc.json?

### env
- Defines which environments the code runs in
- `browser`: Browser globals like `window`, `document`
- `es2021`: Modern JavaScript features
- `node`: Node.js globals
- `jest`: Testing globals

### extends
- Base rule sets we're using
- `airbnb`: Industry-standard style guide
- `airbnb-typescript`: TypeScript-specific rules
- `prettier`: Disables conflicting formatting rules

### rules (Custom overrides)
- `react/react-in-jsx-scope: "off"`: Don't need to import React in every file (React 18+)
- `import/prefer-default-export: "off"`: Allow named exports
- `no-console: ["warn"]`: Allow console.warn and console.error
- `class-methods-use-this: "off"`: Allow methods that don't use `this`