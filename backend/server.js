import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

dotenv.config()

const app = express()

const port = process.env.PORT || 3000
const frontendPath = path.resolve(process.cwd(), "frontend", "dist")

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            origin === `http://localhost:${port}`
        ) {
            return callback(null, true)
        }

        return callback(new Error("Origin is not allowed by CORS"))
    },
    credentials: true
}))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

app.use(express.static(frontendPath))

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
})

app.listen(port, "0.0.0.0", () => {
    connectDB()
    console.log(`Server listening at port ${port}`)
})