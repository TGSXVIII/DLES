import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dles'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

app.use(express.json()); // Middleware to parse JSON bodies

// POST request handler
app.post('/addWords', (req, res) => {
    // Assuming req.body contains JSON data with an array of words
    const words = req.body.words;

    // Your code for handling the POST request goes here
});

// GET request handler
app.get('/', (req, res) => {
    // Your code for handling the GET request goes here
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
