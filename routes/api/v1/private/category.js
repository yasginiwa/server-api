const router = require('koa-router')()
const dao = require('../../../../modules/dao')
const { sign } = require('jsonwebtoken')
const { jwt_config } = require('../../../../config/default')
const passport = require('koa-passport')

router.get('/', passport.authenticate('jwt', { session: false }), async(ctx, next) => {
    
})