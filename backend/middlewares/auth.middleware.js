import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.splite(" ")[1]
    if (!token) return res.status(404).json({message: "No token found"})
    
    try {
        const decoded = jwt.verify(token, "secret-here")
        req.user = decoded
        next()
    } catch(error) {
        console.log("Error: " + error.message)
        return res.status(500).json({message: "Invalid token!"})
    }
}