module.exports = {
  verbose: false,
  rootDir: '..',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>/scripts/setupTests.js']
}
