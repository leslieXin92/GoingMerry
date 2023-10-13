module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__test__/**/*.test.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  detectOpenHandles: true,
  transformIgnorePatterns: ['/node_modules/(?!(your-dependency-to-keep-esm)/)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest', {
        tsconfig: 'tsconfig.json',
        esModuleInterop: true
      }
    ]
  }
}
