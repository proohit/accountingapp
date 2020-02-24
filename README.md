# AccountingAppBackend

## run
To run the backend, type `npm start`. You can also use nodemon with `nodemon index.js`

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

## sidenotes

routes for sub-routes should be appended with index.js/router.use('YOURROUTEPREFIX',exportedRouterFromRouterFile). See [index.js as an example ](./index.js)
