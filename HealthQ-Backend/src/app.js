import express, { Router } from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer' 
import userRouter from './routers/usersRouter.js'
import mailRouter from './routers/mailRouter.js';
import dataRouter from './routers/dataRouter.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: process.env.DB_PORT || "3306",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "HealthQ",
};

async function checkAndAlter() {
  try {
    const connection = await mysql.createConnection(config);
    console.log("Checking DB schema for missing columns...");
    await connection.query("ALTER TABLE appointments ADD COLUMN files LONGTEXT;").catch(e => {});
    await connection.query("ALTER TABLE appointments MODIFY COLUMN files LONGTEXT;").catch(e => {});
    await connection.query("ALTER TABLE appointments ADD COLUMN note TEXT;").catch(e => {});
    await connection.query("ALTER TABLE appointments ADD COLUMN specialty_id INT UNSIGNED;").catch(e => {});
    await connection.query("ALTER TABLE appointments ADD COLUMN hospital_id VARCHAR(50);").catch(e => {});
    await connection.end();
    console.log("DB schema is verified.");
  } catch (err) {
    console.error("DB check failed:", err.message);
  }
}

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



app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use("/users", userRouter);
app.use('/data', dataRouter)
app.use('/mail', mailRouter);

// app.post("register", (req, res) => {
//     console.log(req.body);
//     res.send("ok");
// });


app.get('/', (req, res)=>{
    res.send(`server http://${host}:${port} is running`);
});

app.listen(port, async () => {
    await checkAndAlter();
    console.log(`Server is running at http://${host}:${port}`);
});

export default app;

