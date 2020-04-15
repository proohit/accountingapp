# AccountingAppBackend
See documentation [on documentation page](https://htmlpreview.github.io/?https://github.com/proohit/AccountingAppBackend/blob/master/docs/index.html)
## run

To run the backend, type `npm start`.

## dev

To run nodemon for dev, type `npm run dev`

## build

to build, run `npm run build`. It outputs into the `dist/` folder

## docs
you can generate doc with `npm run doc:dev` which outputs into docs/index.html or `npm run doc:prod` which outputs into dist/docs/index.html

## sidenotes

routes for sub-routes should be appended with index.js/router.use('YOURROUTEPREFIX',exportedRouterFromRouterFile). See [index.js as an example ](./index.js)
