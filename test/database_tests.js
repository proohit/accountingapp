const recordmapper = require('../src/database/RecordMapper')
const {close} = require('../src/database/database')

recordmapper.all().then(data => console.log(data))
close();