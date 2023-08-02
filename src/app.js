import express from "express";

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


// Probando el servidor
app.get('/', (req,res)=>{
    res.send('¡Hola! Escuchando al puerto: 8080')
})


// Escuchando el servidor
app.listen(8080, ()=>{
    console.log('Escuchando al puerto: 8080');
})      