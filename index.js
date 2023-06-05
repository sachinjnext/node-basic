const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const fs = require('fs');
const http = require('http');
const hostname = '127.0.0.1';
const EventEmitter = require('events');
const port = process.env.PORT

app.use(express.json());


// 10. JavaScript Asynchronous Programming and Callbacks
app.get('/promise', (req, res) => {
    function fetchDataFromAPI(callback) {
        // Simulating an API call
        setTimeout(() => {
            const data = { message: "Data received from API" };
            callback(null, data);
        }, 2000);
    }

    function handleAPIData(error, data) {
        if (error) {
            console.error("Error:", error);
        } else {
            console.log("API Data:", data.message);
        }
    }

    console.log("Start");

    fetchDataFromAPI(handleAPIData);

    console.log("End");
})


// 11. JavaScript Promises
app.get('/jspromise', (req, res) => {
    function fetchDataFromAPI() {
        return new Promise((resolve, reject) => {
            // Simulating an API call
            setTimeout(() => {
                const data = { message: "Data received from API" };
                resolve(data);
                // If an error occurs:
                // reject(new Error("Failed to fetch data from API"));
            }, 2000);
        });
    }

    console.log("Start");

    fetchDataFromAPI()
        .then((data) => {
            console.log("API Data:", data.message);
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            console.log("API call completed");
        });

    console.log("End");

})


// 12. Event emitter
app.get('/event', (req, res) => {
    // Create an instance of EventEmitter
    const myEmitter = new EventEmitter();
    // Register an event listener
    myEmitter.on('greet', (name) => {
        console.log(`Hello, ${name}!`);
    });
    // Emit the 'greet' event
    myEmitter.emit('greet', 'John');
})


// 13. http Server
const server = http.createServer((req, res) => {
    // Set the response status and headers
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // Send the response body
    res.end('Hello, World!');
});


// 16. Buffers
app.post('/data', (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ error: 'Data field is missing' });
    }

    // Buffer the data
    const buffer = Buffer.from(data);

    // Process the buffered data (e.g., logging)
    console.log('Received data:', buffer.toString());

    res.status(200).send('Data buffered and processed successfully');
});


// 17. Streams
app.get('/stream', (req, res) => {
    // Create a readable stream from a file
    const readableStream = fs.createReadStream('input.txt');

    // Create a writable stream to a file
    const writableStream = fs.createWriteStream('output.txt');

    // Pipe the data from the readable stream to the writable stream
    readableStream.pipe(writableStream);

    // Handle the 'finish' event when the data has been written successfully
    writableStream.on('finish', () => {
        return res.send('Data has been written to output.txt');
    });

    // Handle errors during the streaming process
    readableStream.on('error', (error) => {
        console.error('Error reading the file:', error);
    });

    writableStream.on('error', (error) => {
        console.error('Error writing to the file:', error);
    });

})


// 18. Error handling & Exception handling, Difference between error and exception
app.get('/exception', (req, res) => {
    function divide(a, b) {
        try {
            if (b === 0) {
                throw new Error('Division by zero error');
            }

            return a / b;
        } catch (error) {
            console.error('An error occurred:', error.message);
            return null;
        }
    }

    function processInput(input) {
        if (typeof input !== 'number') {
            throw new TypeError('Invalid input type');
        }

        return input * 2;
    }

    // Example 1: Error handling
    const result1 = divide(10, 0);
    if (result1 === null) {
        console.log('Division failed');
    } else {
        console.log('Result:', result1);
    }

    // Example 2: Exception handling
    try {
        const result2 = processInput('abc');
        console.log('Result:', result2);
    } catch (exception) {
        console.error('An exception occurred:', exception.message);
    }

})


// 19. Log an Object
app.get('/obj', (req, res) => {
    const person = {
        name: "John Doe",
        age: 30,
        profession: "Software Engineer"
    };

    return res.status(200).send(person);

})


server.listen(port, () => {
    console.log(`API server running on port ${port} `);
});
