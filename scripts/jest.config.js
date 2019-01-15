module.exports = {
  verbose: true,
  rootDir: '..',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>/scripts/setupTests.js']
}
