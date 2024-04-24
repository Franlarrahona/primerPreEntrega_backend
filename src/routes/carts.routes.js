import { Router } from "express";
import CartsManager from "../managers/CartsManager.js";
const CartsRouter = Router();

const cartManager = new CartsManager('../carts.json')

CartsRouter.get('/:cid' , async (req,res) =>{
    const {cid} = req.params;
    try{
        const cart = await cartManager.getCartById(cid);
        res.send(cart)
        
    }catch{
        res.send('no fue posible mostrar los productos del carrito')
    }
    
});
CartsRouter.post('/', async (req,res) =>{
    try{
        const data = await cartManager.cartCreator();
        res.send(data)
    }catch{
        console.log('no fue posible crear el nuevo carrito')
    }
});
CartsRouter.post('/:cid/product/:pid', async (req,res) =>{
    const {cid} = req.params; //carrito
    const {pid} = req.params; //producto
    try{
        const data = await cartManager.LoadProductInCart(cid,pid)
        res.send(data)
    }catch{
        res.send('error al cargar producto a carrito')
    }
})

export default CartsRouter