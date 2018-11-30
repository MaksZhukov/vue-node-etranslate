import express from 'express';
import bodyParser from 'body-parser';

import PG from 'pg';

const app = express();
const client = new PG.Client();

async () => {
  await client.connect();

  const res = await client.query('SELECT $1::text as message', ['Hello world!']);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
};

app.use(bodyParser.json());
app.use(express.static('dist'));

app.listen(3000, () => {
  console.log('app listening at port 3000');
});

export default app;
