import express from 'express'
import cors from 'cors'
import userRouter from './routers/usersRouter.js'
import dataRouter from './routers/dataRouter.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const host = 'localhost'
const port = '3000'

const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: "HealthQ API",
      version: '1.0.0',
      description: "API documentation for HealthQ application"
    },
    servers: [
      { url: `http://${host}:${port}` }
    ]
  },
  apis: ['./src/routers/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/data', dataRouter)

app.listen(port, host, ()=>{
    console.log('server http://'+host+':'+port,'is running')
})