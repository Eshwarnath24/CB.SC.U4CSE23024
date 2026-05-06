import express from "express"
import { createEmail, fetchUnreadMessages } from "../controller/notificationController.js"

const notificationRouter = express()

notificationRouter.post("/notifications", createEmail)
notificationRouter.post("/notifications/unread", fetchUnreadMessages)


export default notificationRouter