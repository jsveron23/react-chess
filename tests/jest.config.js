module.exports = {
  verbose: false,
  rootDir: '..',
  roots: [
    '<rootDir>/src/chess',
    '<rootDir>/src/utils',
    '<rootDir>/tests/chess',
    '<rootDir>/tests/utils'
  ],
  notify: true,
  notifyMode: 'failure',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>/tests/setupTests.js']
}
