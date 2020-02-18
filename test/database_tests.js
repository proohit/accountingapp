const recordmapper = require('../src/database/RecordMapper')
const { close } = require('../src/database/database')
const AES = require('crypto-js/aes')
const crypto = require('crypto-js')
/* 
recordmapper.all().then(data => console.log(data))
close(); */
const key = crypto.enc.Utf8.parse('ABCDEFG');
const encrypted = AES.encrypt(key,'12345678901234567890123456789012').toString()
console.log(encrypted);
let decrypted = AES.decrypt('U2FsdGVkX1+4qYFkzsnysJm17E1YwagSDlENI2jovyw=','12345678901234567890123456789012')
decrypted = crypto.enc.Utf8.stringify(decrypted)
console.log(decrypted);