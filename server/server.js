const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const calcRouter = require('./routes/calc.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.use(express.static('server/public'));

// ROUTES
app.use('/calculations', calcRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
