import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello, World!');
})

app.get('/api/v1/ping', (_req, res) => {
  res.json({message: 'Hey hey hye, sweetie!'});
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})