const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/credentials', (req, res, next) => {
    const { user, password } = req.body;

    if (user === 'me@mail.com' && password === '123456') {
        res.json({ hasError: false, valid: true});
    }
    else {
        res.json({hasError:true, error:'user name or password incorrect'});
    }

    next();
})

app.get('/test', (req, res) => {
    res.json({
        id:1,
        dummy: 'this is dummy message',
        hasErrors: false
    })
})


app.listen('777', () => {
    console.log('running on port 777');
})