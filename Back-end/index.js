import express from 'express';
import cors from 'cors';

import userRoutes from './Router/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('', userRoutes);

app.listen(3000, function () {
  console.log('Server started on port 3000!');
});
