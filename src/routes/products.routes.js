import { Router } from "express";
import ProductManager from "../managers/ProductsManager.js";

const productManager = new ProductManager('../products.json')

const router = Router();

router.get('/', async (req,res) => {
    const {limit} = req.query
    try{
        const products = await productManager.getProducts(limit)
        res.send(products)
    }catch{
        res.send('no fue posible traer los elementos')
    }
})

router.get('/:pid', async (req,res) =>{
    const {pid} = req.params;
    try{
        const product = await productManager.getProductsById(pid);
        res.send(product);
    }catch(error){
        res.send('producto no encontrado')
    }
});

router.post('/',async (req,res) =>{
    let newProduct = req.body;
        try{
            const data = await productManager.addProducts(newProduct)
        }catch{
            res.send('no fue posible agregar el archivo')
        }
})


router.put('/:pid', async (req,res) =>{
    const {pid} = req.params;
    const editProduct = req.body;
    try{
        const data = await productManager.updateProducts(pid,editProduct)
        res.send(data)
    }catch{
        res.send('no fue posible editar el producto')
    }
})

router.delete('/:pid', async (req,res) => {
    const {pid} = req.params;
    try{
        const data = await productManager.deleteProduct(pid);
        res.send(data);
    }catch{
        res.send('no fue posible eliminar el producto')
    }
    
})

export default router

