const express = require('express')
var User = require('./FormController.js');
const app = express()
const port = 5000

app.use(express.json());

app.use('/api/create', User.qtdEmailsEnviados, User.createInfo);

app.use(function (err, req, res, next) {

    res.status(err.status).json({
        message: err.message
    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})