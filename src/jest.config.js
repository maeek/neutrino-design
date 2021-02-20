module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  roots: ['<rootDir>'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./src/setupTests.ts']
};
