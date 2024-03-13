import { Sells } from "../models/venta.js";
import { Sneaker } from "../models/products.js";

export const venta = async (req , res ) =>{

    try {
        const{reciver,products} = req.body;

         const prices = await getPriceList(products);

         const total = prices.reduce((acc, price) => acc + price, 0);

        const Venta = new Sells({reciver,products,total});

        await Venta.save();

        return res.json({ok : true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({erro:"Server Error"});
    }



}

const getPriceList = async (productIds) => {
    try {
        const pricePromises = productIds.map(async (productId) => {
            const snk = await Sneaker.findById(productId);

            if (!snk) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            return snk.price;
        });

   
        const prices = await Promise.all(pricePromises);
        return prices;

    } catch (error) {
        console.error(error);
        throw new Error("Error obtaining product prices");
    }
};