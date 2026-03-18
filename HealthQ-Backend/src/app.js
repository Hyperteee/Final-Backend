import express from 'express'
import cors from 'cors'
import userRouter from './routers/usersRouter.js'

const host = '172.24.112.1'
const port = '3000'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userRouter)

app.listen(port, host, ()=>{
    console.log('server http://'+host+':'+port,'is running')
})