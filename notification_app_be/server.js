import express from "express"
import cors from "cors"
import notificationRouter from "./src/routers/notificationRouter.js"
import loginRouter from "./src/routers/loginRouter.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use("/notifications", notificationRouter)
app.use("/login", loginRouter)


app.post("/", (req, res) => {
    res.send("API is working")
})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})