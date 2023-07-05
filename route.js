const fs = require('fs');

const jsonData = fs.readFileSync('words.json');
const wordsData = JSON.parse(jsonData);

function handleSuggestions(searchTerm, res) {
  const suggestions = wordsData.words.filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(suggestions));
}

function handleDefault(res) {
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

module.exports = { handleSuggestions, handleDefault };
