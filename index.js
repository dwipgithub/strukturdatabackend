import express from "express"
import router from './routes/index.js'
import cors from "cors"

const app = express()
app.use(cors( {credentials: true, origin: ["http://localhost:3000"]}))
app.use(express.json())
app.use(router)

app.listen(5001, () => {
    console.log("server running at port 5001")
})