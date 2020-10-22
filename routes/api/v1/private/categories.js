const router = require('koa-router')()
const dao = require('../../../../modules/dao')
const passport = require('koa-passport')

//  获取分类列表
router.get('/', passport.authenticate('jwt', { session: false }), async(ctx, next) => {
    if (ctx.state.user) {   //认证成功
        const categories = await dao.execQuery(`select * from t_category`)
        ctx.sendResult({ categories }, 200, '获取分类列表成功')
    } 
    next()
})

//  添加分类
router.post('/', passport.authenticate('jwt', { session: false }), async(ctx, next) => {
    if (ctx.state.user) {   //认证成功
        const { name, pid, p_level } = ctx.request.body
        const addRes = await dao.execQuery(`insert into t_category values (null, '${name}', ${pid}, ${p_level})`)
        if (addRes) {
            const cateRes = await dao.execQuery(`select * from t_category where name = '${name}'`)
            ctx.sendResult(cateRes[0], 200, '添加分类成功')
        }
    } 
    next()
})

//  根据id查询分类
router.get('/:id', passport.authenticate('jwt', { session: false }), async(ctx, next) => {
    if (ctx.state.user) {
        const queryRes = await dao.execQuery(`select * from t_category where id = ${ctx.params.id}`)
        if (queryRes) {
            ctx.sendResult(queryRes[0], 200, '查询成功') 
        }
    }
    next()
})

//  根据id修改分类信息
router.put('/:id', passport.authenticate('jwt', {session: false}), async(ctx, next) => {
    const newName = ctx.request.body.name
    if(ctx.state.user) {
        const modifyRes = await dao.execQuery(`update t_category set name = '${newName}' where id = ${ctx.params.id}`)
        if (modifyRes) {
            const cateRes = await dao.execQuery(`select * from t_category where id = ${ctx.params.id}`)
            ctx.sendResult(cateRes[0], 200, '修改成功')
        }
    }
})

module.exports = router.routes()