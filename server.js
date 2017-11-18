const express = require('express')
const { distPath } = require('./lib/path')
const config = require('./config')
const app = express()

app.use(express.static(distPath))
app.listen(config.port)
