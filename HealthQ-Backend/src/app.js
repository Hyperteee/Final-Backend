import express from 'express'
import cors from 'cors'
import userRouter from './routers/usersRouter.js'
import dataRouter from './routers/dataRouter.js'

const host = 'localhost'
const port = '3000'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/data', dataRouter)

app.listen(port, host, ()=>{
    console.log('server http://'+host+':'+port,'is running')
})