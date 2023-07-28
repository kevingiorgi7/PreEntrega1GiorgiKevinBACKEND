import {Router} from "express";

import ProductManager from "../ProductManager.js";


const router = Router()

const manager = new ProductManager("Products.json");


router.get('/', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        let limit = Number(req.query.limit);
        let productsLimited = limit? products.slice(0,limit) : products;
        res.json(productsLimited)
    } catch (error) {
        throw error
    }
})

router.get('/:pid', async (req,res)=>{
    try {
            let id = Number(req.params.pid)
            const product= await manager.getProductsById(id)
            res.send({product})
    } catch (error) {
        throw error
    }

})

export default router