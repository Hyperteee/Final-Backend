import express, { Router } from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer' 
import userRouter from './routers/usersRouter.js'
import mailRouter from './routers/mailRouter.js';


import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const host = 'localhost';
const port = '3000';

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'HealthQ API',
      version: '1.0.0',
      description: 'API documentation for HealthQ application'
    },
    servers: [
      { url: `http://${host}:${port}` }
    ]
  },
  apis: ['./src/routers/*.js'], 
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



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