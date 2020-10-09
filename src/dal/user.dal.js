'use strict';
const DbContext = require('../contexts/data/db-context');
const cipher = require('../cipher');
const { User } = require('../models/user');

const insert = async function(user, role) {
    const dbContext = new DbContext();
    const userData = await dbContext.query(`
        insert into auth."User" ("RoleId", "Email", "Password", "FirstName", "MobileNum") 
        values ($1,$2,$3,$4,$5) 
        returning *;`, [ role, user.Email, cipher.encrypt(user.Password), user.FirstName, user.MobileNum ]);

    return new User(userData || {});
}

const getByMobile = async function(user) {
    const dbContext = new DbContext();
    const userData = await dbContext.query(`select * from auth."User" where "MobileNum" = $1`, [ user.MobileNum ]);

    return new User(userData || {});
}

module.exports = { insert, getByMobile }