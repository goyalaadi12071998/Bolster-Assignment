require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');

const getConfigs = require('./configs/index')
const connectDB = require('./providers/db/index');
const getEnv = require('./common/env')
const NotFoundHandler = require('./router/middlewares/notfoundhandler-middleware')

const v1routes = require('./router/index') 

app.set('trust proxy', 1)
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(morgan())
app.use(mongoSanitize())
app.use(bodyParser.json())
app.use('/api/v1', v1routes)
app.use(NotFoundHandler)

const env = getEnv()
const configs = getConfigs(env)

const start = async () => {
    try {
        // await connectDB(configs.db.MongoUrl)
        var server = app.listen(configs.core.Port, () => {console.log("Server is listening on port: ", configs.core.Port)})

        process.on("SIGTERM", () => {
            server.close(() => { console.log("Closing Server") })
        })

    } catch (err) {
        console.log(err);
    }
} 

start()