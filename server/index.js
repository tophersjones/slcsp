const PORT = 8080
const server = require('./server')
const { db } = require('./db')

db.sync({force: false})
  .then(() => {
    server.listen(PORT, () => console.log(`
        Listening on port ${PORT}
        http://localhost:${PORT}/
    `))
  })
