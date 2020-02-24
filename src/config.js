export default {
    api: process.env.NODE_ENV === 'production' ? "https://accounting.dirit.me/api" : "http://localhost:3002/api"

}