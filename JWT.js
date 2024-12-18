const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};




module.exports = generateToken;


// const crypto = require("crypto");
// const generateJWTSecret = () => {
//     // Generate a random 64-byte key and convert it to a hexadecimal string
//     const secretKey = crypto.randomBytes(64).toString("hex");
//     console.log("Generated JWT Secret Key:");
//     console.log(secretKey);
// };
// generateJWTSecret();