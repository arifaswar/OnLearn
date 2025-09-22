import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import connectDB from './configs/mongooseDB.js';
import routes from './routes/index.js';

dotenv.config();
await connectDB()

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Welcome to OnLearn')
})

app.use(routes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})