import express from "express"
import {} from 'dotenv/config'
import router from './routes/index.js'
import cors from "cors"

const app = express()
app.use(cors( {credentials: true, origin: [process.env.ORIGIN]}))
app.use(express.json())
app.use(router)

app.listen(3001, () => {
    console.log("server running at port 3001")
})