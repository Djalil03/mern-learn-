const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json({extended: true}))

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/api/auth', require('./auth.routes'))
app.use('/api/link', require('./link.routes'))
app.use('/t', require('../routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000
// const PORT = 5000
// const mongoUri = 'mongodb+srv://djalil:Sssuper10@cluster0.mmkf7.mongodb.net/?retryWrites=true&w=majority'

async function start() {
    try{
       await mongoose.connect(config.get('mongoUri')), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
       }
       app.listen(PORT,() => console.log(`App has been started on port  ${PORT}...`))
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

