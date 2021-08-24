const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const bcrypt = require(`bcryptjs`);

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


module.exports = {
    bcrypt,
    csrfProtection,
    asyncHandler,
};
