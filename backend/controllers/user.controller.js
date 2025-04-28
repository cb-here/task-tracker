import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const {username, email, password, country} = req.body
    try {
        if (!username || !email || !password || !country){
            return res.status(400).json({message: "Missing required fields"})
        }
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            country
        }) 
        await newUser.save()
        res.status(201).json(newUser)
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({message: "Missing required fields"})
        }
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message: "User not found!"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"})
        
        let token = jwt.sign({id: user._id}, "secret-here", {expiresIn: '3d'})
        res.status(200).json({user, token})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}