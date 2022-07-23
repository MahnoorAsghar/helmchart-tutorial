const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World!' })
})

const fibonacci = n => {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
};

app.post('/fib', (req, res) => {
    const fibIndex = req.body.index

    const fibNumber = fibonacci(fibIndex)

    res.json({ index: fibIndex, number: fibNumber })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
