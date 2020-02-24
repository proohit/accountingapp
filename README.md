# AccountingAppBackend

## API documentation

### Records

POST /records, body: description, value, timestamp (tbd), wallet
PUT /records/:id, body: description, value, timestamp (tbd), wallet
DELETE /records/:id
GET /records
GET /records/:id


### Verification

POST /register, body: username, password
POST /login, body: username, password

### Wallet

GET /wallets/:name
POST /wallets, body: name, balance