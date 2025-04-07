import jwt from "jsonwebtoken"

//Earl - decodes a jwt to get the usedID and match it
const verifyToken = (token) => {
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded; // e.g., { userId: 'abc123', iat: ..., exp: ... }
    } catch (error) {
        throw new Error("Invalid or expired token");  
    }
  }

export default generateToken; 