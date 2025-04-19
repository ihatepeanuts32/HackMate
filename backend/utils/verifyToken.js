import jwt from "jsonwebtoken"

//Earl - decodes a jwt to get the usedID and match it
export const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }
  const token = authHeader.split(" ")[1]; //

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
        throw new Error("Invalid or expired token");  
    }
  }

export default verifyToken; 