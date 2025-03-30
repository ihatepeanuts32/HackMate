import jwt from "jsonwebtoken"

//Naomi - the generateToken  arrow function creates a jwt for session managment
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d"});
}

export default generateToken;