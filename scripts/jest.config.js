module.exports = {
  roots: ['../tests', '../src'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./setupTests.js']
}
