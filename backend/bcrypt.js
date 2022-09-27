const bcrypt = require("bcryptjs");
const saltRounds = 10;

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    return hashedPassword;
}

async function comparePassword(password, hash) {
    const samePassword = await bcrypt.compare(password, hash);
    console.log(samePassword);
    return samePassword;
}

module.exports = {
    hashPassword,
    comparePassword
};