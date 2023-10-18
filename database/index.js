const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const server = require("./server.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/", server);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
