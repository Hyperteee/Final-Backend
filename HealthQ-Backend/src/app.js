import express, { Router } from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer' // เปลี่ยนเป็นแบบนี้ครับ
import userRouter from './routers/usersRouter.js'
import mailRouter from './routers/mailRouter.js';


const host = 'localhost'
const port = '3000'

const app = express()

app.use(cors())
app.use(express.json())
app.use(Router)
app.use(userRouter)
app.use('/mail', mailRouter);

app.get('/', (req, res)=>{
    res.send(`server http://${host}:${port} is running`);
});

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

export default app;