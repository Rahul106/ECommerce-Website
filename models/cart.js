const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


module. exports = class Cart {

    static addProduct(id, productPrice) {
        //fetch previous cart
        fs.readFile(p,(err, content) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(content);
            }
            //analyze the cart (find existing product)

            const existingProductIndex = cart.products.findIndex((p)=> p.id==id);

            const existingProduct = cart.products[existingProductIndex];


            //increase quantity if existing prod or add new prod
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct
            }
            else{
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }
}