module.exports = {
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageThreshold: {
      global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
      }
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover']
  };