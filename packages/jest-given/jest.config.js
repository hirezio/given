module.exports = {
  preset: 'ts-jest',
  rootDir: '../../',
  roots: ['<rootDir>/shared/given-core', '<rootDir>/packages/jest-given/spec'],
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'packages/jest-given/coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/packages/jest-given/tsconfig.json'
    }
  }
};
