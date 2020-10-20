const router = require('koa-router')()
const dao = require('../../../../modules/dao')
const { sign } = require('jsonwebtoken')
const { jwt_config } = require('../../../../config/default')
const resextra = require('../../../../modules/resextra')

router.get('/', async(ctx, next) => {
    ctx.body = {
        code: 200,
        msg: '获取用户列表成功'
    }
    next()
})

router.post('/login', async (ctx, next) => {

    let email = ctx.request.body.email
    let queryResult = await dao.execQuery(`select * from t_users where email = '${email}'`)
    let user = queryResult[0]
    
    if (queryResult.length === 0) {
        ctx.status = 404
        ctx.body = {
            emial: '用户不存在'
        }
    } else {
        const payload = {id: user.id, name: user.name, mobile: user.mobile}
        const token = `Bearer ${sign(payload, jwt_config.secretOrKey, {expiresIn: jwt_config.expiresIn})}`
        ctx.sendResult({ token, user }, 200, 'success')
    }
    next()
})

module.exports = router.routes()