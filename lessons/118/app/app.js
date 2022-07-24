const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello World!' })
})

const fibonacci = n => {
    if (n <= 1) {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

app.post('/fib', (req, res) => {
    const fibIndex = req.body.index
    res.status(202).json({ index: fibIndex })

    console.log("Fibonacci number:", fibonacci(fibIndex))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
