// Como utilizamos TypeScript podemos utilizar a última sintaxe
// do javascript disponível, como o ESM com os imports
import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
