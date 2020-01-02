const express = require('express')
const app = express()
const port = 8080

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.urlencoded({ extended: true })) 

const { Contact } = require('./routes')

app.get('/', (req, res) => {
    res.redirect('/contact')
})
app.use('/contact', Contact)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))