const http = require('http');
const { handleSuggestions, handleDefault } = require('./route');

const server = http.createServer((req, res) => {

  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/suggestions') {
    const searchTerm = searchParams.get('term');
    handleSuggestions(searchTerm, res);
  } else {
    handleDefault(res);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
