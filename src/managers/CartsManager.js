import fs from 'fs';
import ProductManager from './ProductsManager.js';
//clase
export default class CartsManager{
    constructor(){
        this.carts = []
    }
    async getCartById(cid){
        try{
            const dataJson = await fs.promises.readFile('./src/carts.json', 'utf-8');
            const data = JSON.parse(dataJson);
            const dataId = data.find(cart => cart.cartId === parseInt(cid) )
            
            if(dataId){
                return dataId
            }else{
                return console.log('elemento no encontrado')
            }
        }catch{
            return console.log('error al obtener producto')
        }
        
    }
    async cartCreator(){
        try {
            const dataJson = await fs.promises.readFile('./src/carts.json', 'utf-8');
            const data = JSON.parse(dataJson);
            const cartsCant = data.length;
    
            const newCart = {
                cartId: cartsCant + 1,
                products: []
            };
    
            data.push(newCart);
    
            const newData = JSON.stringify(data,null,2);
            await fs.promises.writeFile('./src/carts.json', newData);
    
            return data;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            
        }
    }
    

}