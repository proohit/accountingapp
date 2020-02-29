# AccountingAppBackend

## run
To run the backend, type `npm start`. You can also use nodemon with `nodemon index.js`

## API documentation

### Records

URL for the backend will be url/api. It is necessary  that the header for each requests includes "Content-Type":"application/json".
Format for the timestamp is "YYYY-MM-DD HH:MM:SS"

POST /records, body: description, value, timestamp, wallet

PUT /records, body: id, description, value, timestamp, wallet

DELETE /records/:id

GET /records

GET /records/:id

Record Schema: id: number, description: string, value: number, timestamp: date, wallet: string

### Verification

POST /register, body: username, password

POST /login, body: username, password

### Wallet

GET /wallets/:name

POST /wallets, body: name, balance

## sidenotes

routes for sub-routes should be appended with index.js/router.use('YOURROUTEPREFIX',exportedRouterFromRouterFile). See [index.js as an example ](./index.js)
