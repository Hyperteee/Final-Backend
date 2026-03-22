import express, { Router } from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer' 
import userRouter from './routers/usersRouter.js'
import mailRouter from './routers/mailRouter.js';


const host = 'localhost'
const port = '3000'

const app = express()

// const UserRouter = Router()



app.use(express.json())
app.use(cors())
app.use("/users", userRouter);
app.use('/mail', mailRouter);

// app.post("register", (req, res) => {
//     console.log(req.body);
//     res.send("ok");
// });


app.get('/', (req, res)=>{
    res.send(`server http://${host}:${port} is running`);
});

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

export default app;