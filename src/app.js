import express from  'express';
import config from './config.js';
import productsRouter from './routes/products.routes.js';
import CartsRouter from './routes/carts.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use('/api/carts',CartsRouter);

app.listen(config.PORT, () =>{
    console.log(`server funcionando en puerto ${config.PORT}`)
})