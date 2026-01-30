const {readFile} = require('fs');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    readFile('./assets/loomad.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const loomad = JSON.parse(data);

        res.render('index', { title: 'Avaleht', loomad: loomad });
    });
});

app.get('/meist', (req, res) => {
    res.render('meist', { title: 'Meist' });
});

app.get('/kontakt', (req, res) => {
    res.render('kontakt', { title: 'Kontakt' });
});

app.get('/loomad', (req, res) => {
    readFile('./assets/loomad.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const loomad = JSON.parse(data);

        res.render('loomad', { title: 'Loomad', loomad: loomad });
    });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Leht ei leitud' });
});

app.listen(3000, () => {
    console.log("Server jookseb portil 3000");
});