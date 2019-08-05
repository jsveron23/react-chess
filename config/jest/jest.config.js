module.exports = {
  verbose: false,
  silent: true,
  bail: 1,
  rootDir: '../..',
  roots: ['<rootDir>/src/chess', '<rootDir>/src/utils'],
  notify: true,
  notifyMode: 'failure',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/tests/?(*.)+(spec|test).js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>/config/jest/setupTests.js']
}
