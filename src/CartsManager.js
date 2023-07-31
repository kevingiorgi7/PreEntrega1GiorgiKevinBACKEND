import fs from 'fs'

export default class CartsManager {
    constructor(path) {
        this.path = path
    }
    async getCarts(){
        try {
            if (!existsSync(this.path)) {
                return []
            }
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } catch (error) {
            throw error
        }
    }
    async getCartsByID(id){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(e=>e.id===id)
            if (!cart) {
                return {"ERROR":`El ID ${id} no existe o no es un número`}
            }
            return cart
        } catch (error) {
            throw error
        }
    }
    async createCart() {
        try {
            const cartsPrev = await this.getCarts()
            let id
            if (!cartsPrev.length) {
                id = 1
            } else {
                id = cartsPrev[cartsPrev.length - 1].id + 1
            }
            const newCart = { products: [] ,id}
            cartsPrev.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev))
            return newCart
        } catch (error) {
            throw error
        }
    }

    async addProduct(cid,pid){
        try {
            const cart = await this.getCartsByID(cid)
            const cartIndex = cart.products.findIndex(e=>e.id===pid)
            if(cartIndex===-1){
                cart.products.push({
                    product: pid,
                    quantity: 1
                })
            } else {
                cart.products[cartIndex].quantity++
            } 
            return cart
        } catch (error) {
            throw error
        }
    }
}

