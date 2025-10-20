export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/main.tsx',
      '!src/vite-env.d.ts',
    ],
    coverageThreshold: {
      global: {
        branches: 10,
        functions: 10,
        lines: 10,
        statements: 10,
      },
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };