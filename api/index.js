const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

// app.get('/', (req, res) => {
//     res.sendFile('../views/index.html', { root: __dirname });
// });

// app.get('/views/:file', (req, res) => {
//     const file = req.params.file;
//     res.sendFile(`../views/${file}.html`, { root: __dirname });
// });


module.exports = app;