const express = require('express');
const path = require('path');
const app = express();



app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.send("Hello world !");
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


