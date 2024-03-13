import { Sneaker } from "../models/products.js"


export const getSneakers = async (req,res) =>{
    try {
        const snaekers = await Sneaker.find();

        return res.json({snaekers});

    } catch (error) {
        console.log(error);
        return res.status(500).json({erro:"Server Error"});
    }
};

export const getSnk = async (req ,res) => { 
    try {
        const {id} = req.params
        const snk = await Sneaker.findById(id)
        
        if(!snk) return res.status(404).json({error : "id no existente"})

        return res.json({snk})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Server Error"});
    }
 }

export const creteSnekaer = async(req,res) => {
    try {
        const{name,model,size,price,brand,stock,category} = req.body;

        const sneakers  = new Sneaker({name,model,size,price,brand,stock,category});
        await sneakers.save();
        return res.json({ok : true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({erro:"Server Error"});
    }
 }

 

  export const removeSnk = async (req, res) => {
    try {
        const { id } = req.params;

        const snk = await Sneaker.findById(id);

        if (!snk) return res.status(404).json({ error: "No existe el id" });

        await snk.deleteOne();

        return res.json({ ok : true });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const updateSnk = async (req, res) => {
    try {
        const { id  } = req.params;

        const{name,model,size,price,brand,stock,category} = req.body;

        const snk = await Sneaker.findById(id);

        if (!snk) return res.status(404).json({ error: "No existe el sneaker" });

         await snk.updateOne({ $set: { name,model,size,price,brand,stock,category} })
        

        return res.json({ ok : true });

    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};