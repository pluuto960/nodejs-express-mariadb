const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const { getNews, getNewsById, deleteNews, createNews, updateNews } = require('./database');
app.get('/news/:id', async (req, res) => {
const id = req.params.id;
const news = await getNewsById(id);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
const news = await getNews();

res.render('index', {
title: '- Avaleht - Node.js veebirakendus',
news: news,
msg: req.query.msg
});
});



res.render('news', {
title: news.title,
news
});
});



app.get('/news/create', (req, res) => {
  res.render('news_create', { errors: [], values: {} });
});

app.post(
    '/news/create',

    //andmete valideerimine
    body('title').trim().notEmpty().withMessage('Pealkiri on kohustuslik'),
    body('content').trim().notEmpty().withMessage('Sisu on kohustuslik'),

    async (req, res) => {
        //kontrollime valideerimise tulemusi
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.render('news_create', {
                errors: errors.array(),
                values: req.body
            });
        }

    const { title, content } = req.body;
    await createNews(title, content);
    res.redirect('/');
});

app.get('/news/delete/:id', async (req, res) => {
   const id = req.params.id;
   await deleteNews(id);
   res.redirect('/');
});

app.post('/news/delete', async (req, res) => {
const { id } = req.body;

const deleted = await deleteNews(id);

if (deleted) {
res.redirect('/?msg=deleted');
} else {
res.redirect('/?msg=delete_failed');
}
});

app.get('/news/:id/edit', async (req, res) => {
  const id = req.params.id;
  const news = await getNewsById(id);
  res.render('edit', { news });
});

app.post('/news/:id/edit', async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  await updateNews(id, title, content);
  res.redirect(`/news/${id}`);
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Lehte ei leitud' });
});

app.listen(3000);