import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import orders_Products_routes from './handlers/OrdersProducts';
import product_routes from './handlers/Product';
import user_routes from './handlers/User';
import orders_routes from './handlers/Order';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Create a new express application instance
const app: express.Application = express();

app.use(morgan('dev'));

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Routes
orders_Products_routes(app);
product_routes(app);
user_routes(app);
orders_routes(app);

// Start the server
const PORT: string | undefined = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running and listening on port ${PORT}!`);
});

export default app;
