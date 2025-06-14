import express, { Application, } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import adminRoute from './routes/admin'
import { pool } from './drizzle/db';

const app: Application = express();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());


app.use("/admin", adminRoute);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    // Try a simple query to check DB connection
    await pool.query('SELECT 1');
    console.log('Database connection is successful');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
  console.log(`Server is listening on port ${port}`);
});
