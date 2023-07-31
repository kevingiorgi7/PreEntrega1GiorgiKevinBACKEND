import {Router} from "express";
import CartsManager from "../CartsManager.js";
const router = Router()
const manager = new CartsManager("Carts.json");

router.get('/cid',async(req,res)=>{
    try {
        const {cid} = req.params
        const cart = await manager.getCartsByID(+cid)
        res.status(200).json({ message: 'Cart', cart})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})

router.post('/',async(req,res)=>{
    try {
        const createCart = await manager.createCart()
        res.status(200).json({message: 'Cart', createCart})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})

router.post('/cid/products/pid',async(req,res)=>{
    const {cid,pid} = req.params
    try {
        const addProduct = await manager.addProduct(+cid,pid)
        res.status(200).json({message:'Producto agregado',addProduct})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})



export default router