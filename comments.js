// Create web server application that can accept POST requests with JSON body
// and write it to the file.
// Use Postman to test it.
// File name should be specified as a path parameter.
// If file does not exist, it should be created.
// If file already exists, new content should be appended to it.
// If file is not specified, return error message
// If body is not specified, return error message
// If request is successful, return success message
// Use async/await syntax

const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.use(express.json());

app.post('/comments/:filename', async (req, res) => {
  const { filename } = req.params;
  const { body } = req;

  if (!filename) {
    res.status(400).send('File name is not specified');
    return;
  }

  if (!body) {
    res.status(400).send('Body is not specified');
    return;
  }

  const filePath = path.resolve(__dirname, filename);

  try {
    await fs.appendFile(filePath, JSON.stringify(body));
    res.send('Success');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));