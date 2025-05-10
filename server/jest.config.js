module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/test/**/*.spec.ts'], // Or wherever your test files are located
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};