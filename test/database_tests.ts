// const recordmapper = require('../src/database/RecordMapper')
// import { login } from '../src/database/database';
import mysql from 'mysql2';
import Koa from 'koa';
const AES = require('crypto-js/aes');
const crypto = require('crypto-js');
// const Record = require('../src/database/Record')
/*
recordmapper.all().then(data => console.log(data))
close(); */
/* const key = crypto.enc.Utf8.parse('ABCDEFG');
const encrypted = AES.encrypt(key,'12345678901234567890123456789012').toString()
console.log(encrypted);
let decrypted = AES.decrypt('U2FsdGVkX1+4qYFkzsnysJm17E1YwagSDlENI2jovyw=','12345678901234567890123456789012')
decrypted = crypto.enc.Utf8.stringify(decrypted)
console.log(decrypted); */

// const record = new Record();
// record.setId(2)
// record.setDescription('hallo, test')
// console.log(record);

// database.con.query("SELECT * FROM User WHERE username='direnc'", (err, data) => {
//     let decrypted = AES.decrypt(data[0].password, data[0].private_key);
//     decrypted = crypto.enc.Utf8.stringify(decrypted)
//     console.log(decrypted);
// })

/* const date = new Date().toISOString();

recordmapper.createRecord('abc noch ein test', 12, 'Konto', date, 'direnc').then(res => console.log(res));

 */
