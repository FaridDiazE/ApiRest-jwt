import { Sells } from "../models/venta.js";
import { User } from "../models/user.js";
import { Sneaker } from "../models/products.js";

export const venta = async (req , res ) =>{

    try {
        const{reciver,products} = req.body;

        console.log(reciver,products);

        const Usr = await User.findById(reciver);

        const prices = await getPriceList(products);

        const total = prices.reduce((acc, price) => acc + price, 0);

        const Venta = new Sells({reciver,products,total});

        await Venta.save();
        
        const shopingcar = [''];

        await Usr.updateOne({ $set: { shopingcar} })

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


export const getVentas = async (req,res) =>{
    try {
        const ventas = await Sells.find();

        return res.json({ventas});

    } catch (error) {
        console.log(error);
        return res.status(500).json({erro:"Server Error"});
    }
}

const getSnk = async (identificador) => { 
    try {
        const snk = await Sneaker.findById(identificador)
        
        if(!snk) return res.status(404).json({error : "id no existente"})

        return res.json({snk})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Server Error"});
    }
 }