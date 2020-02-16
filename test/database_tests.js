const database = require('../src/database/database')

database.all().then(data => console.log(data))
database.close();