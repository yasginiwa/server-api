const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const resextra = require('./modules/resextra')
const users = require('./routes/api/v1/public/users')
const { baseURL } = require('./config/default')
const passport = require('koa-passport')

let app = new Koa()

//  初始化bodyparser
app.use(bodyParser())

//  初始化koa-passport
app.use(passport.initialize())
app.use(passport.session())

//  回调到config文件夹中 passport.js
require('./config/passport')(passport)

//  统一设置api返回格式
app.use(resextra)

router.use(`${baseURL.private}/users`, users)

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000 running...')
})