import {check} from 'express-validator'

const loginCheck = [
    check('email').isEmail(),
    check('password').isLength({min: 5})
]

export default loginCheck;