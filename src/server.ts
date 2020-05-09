import express from 'express';
import routes from './routes';

const app = express();

// O routes vira como se fosse um middleware do projeto
// E vamos adicionar todas as rotas definidas no arquivo routes
// dentro do nosso app.
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
