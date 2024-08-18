const app = require('./app');
const port = 8080;
const address = 'http://localhost';

app.listen(port, () => {
  console.log(`Servidor iniciado: ${address}:${port}`);
});