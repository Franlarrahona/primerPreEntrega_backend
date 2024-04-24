import fs from 'fs';


//clase

export default class ProductManager{
    constructor(){
        this.product = [];
    }
    async getProducts(limit){
        try{
            const dataJson = await fs.promises.readFile('src/products.json', 'utf-8');
            const data = JSON.parse(dataJson);
            if(limit){
                const limitedData = data.slice(0,parseInt(limit))
                return limitedData;
            }else{
                return data
            }
        }catch(error){
            return('error al obtener productos' +error)
        }
    }
    async getProductsById(pid){
        try{
            const dataJson = await fs.promises.readFile('./src/products.json', 'utf-8');
            const data = JSON.parse(dataJson);
            
            const dataId = data.find(data => data.id == pid);
            if(dataId){
                return dataId 
            }else{
                return console.log('producto no encontrado')
            }
        }catch(error){
        
        console.log('error al buscar producto'+error)
        }
    }
    async addProducts(newProducts){
        try{
            const dataJson = await fs.promises.readFile('./src/products.json', 'utf-8');
            const data = JSON.parse(dataJson);

            data.push(newProducts);
            const newDataJson = JSON.stringify(data,null,2);

            await fs.promises.writeFile('./src/products.json', newDataJson);
            return data
        }catch{
            console.error('error al agregar productos')
        }
    }
    async updateProducts(pid , edit){
        try{
            const dataJson = await fs.promises.readFile('./src/products.json', 'utf-8');
            const data = JSON.parse(dataJson);
            
            const dataId = data.findIndex(data => data.id == pid);
    
            if(dataId != -1){
                const updateProduct = {...data[dataId], ...edit};
                data[dataId] = updateProduct;
                let newData = JSON.stringify(data,null,2);
    
                await fs.promises.writeFile('./src/products.json',newData);
                return data 
            }
        }catch{
            return console.log('no fue posible modificar el archivo')
        }
    }

    async deleteProduct(pid){
        try{
            const dataJson = await fs.promises.readFile('./src/products.json', 'utf-8');
            const data = JSON.parse(dataJson);
    
            const dataId = data.findIndex(data => data.id == pid);
    
            data.splice(dataId,1);
    
            let newData = JSON.stringify(data,null,2);
            await fs.promises.writeFile('./src/products.json',newData)
            return data
        }catch{
            console.log('no fue posible eliminar el producto')
        }
    
    }
}