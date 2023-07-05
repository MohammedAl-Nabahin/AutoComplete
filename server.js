const http = require('http');
const fs = require('fs');

const jsonData = fs.readFileSync('words.json');
const wordsData = JSON.parse(jsonData);

const server = http.createServer((req, res) => {

  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/suggestions') {

    const searchTerm = searchParams.get('term');

    const suggestions = wordsData.words.filter(word =>
      word.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(suggestions));
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
