const router = require('koa-router')()
const dao = require('../../../../modules/dao')
const tools = require('../../../../modules/tools')

router.post('/', async(ctx, next) => {
    const requestBody = ctx.request.body
    const newUser = { username: requestBody.username, password: tools.enbcrypt(requestBody.password), mobile: requestBody.mobile, email: requestBody.email, avatar: requestBody.avatar }
    const result = await dao.execQuery(`insert into t_users values (null, '${newUser.username}', '${newUser.password}', '${newUser.mobile}', '${newUser.email}', '${newUser.avatar}', default)`)

    if(result) {
        ctx.sendResult({ username: newUser.username, mobile: newUser.mobile, email: newUser.email, avatar: newUser.avatar }, 200, '注册用户成功')
    } else {
        ctx.sendResult(null, 400, '注册用户失败')
    }
})

module.exports = router.routes()