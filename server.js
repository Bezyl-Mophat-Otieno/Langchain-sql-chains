import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import { getAllTables } from './services/data-source.js';
import { formulateQueryChain } from './services/create-sql-query-chain.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/get-all-tables', (req, res) => {
    const tables = getAllTables()
    console.log(tables)
    res.send(tables);
});

app.get('/formulate-query-chain', async (req, res) => {
    const formulatedQueryChain = await formulateQueryChain()
    res.send(formulatedQueryChain);
});

app.listen(3000, () => {
    console.log(`server is running on port 3000. click here to access http://localhost:3000/`);
});
