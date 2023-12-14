import productsMocksDao from "../src/dao/mocks/products.mocks.dao.js";
import productModels from "../src/dao/mocks/products.models.js";
import { Router } from "express";;

const performanceRouter = Router();

// Operacion de prueba simple
performanceRouter.get("/simple", (req, res) => {
    
    let counter = 0;
    for (let i = 1; i <= 100; i++) {
      counter = counter + i;
    }
    return res.status(200).json({ counter });
});
  
// Operacion de prueba compleja
performanceRouter.get("/complex", (req, res) => {
    
    let counter = 0;
    for (let i = 1; i <= 1000000000; i++) {
      counter = counter + i;
    }
    return res.status(200).json({ counter });
});
  
// Crear un producto
performanceRouter.post("/products", async (req, res) => {
    
    try {
      let data = productsMocksDao();
      let one = await productModels.create(data);
      return res.status(201).json({ response: one });
    } catch (error) {
      console.log(error);
    }
});

// Leer un producto
performanceRouter.get("/products/:id", async (req, res) => {
    
    try {
      let { id } = req.params;
      let one = await productModels.findById(id);
      return res.status(200).json({ response: one });
    } catch (error) {
      console.log(error);
    }
});

// Eliminar un producto
performanceRouter.delete("/products/:id", async (req, res) => {
    
    try {
      let { id } = req.params;
      let one = await productModels.findByIdAndDelete(id);
      return res.status(200).json({ response: one });
    } catch (error) {
      console.log(error);
    }
});

export default performanceRouter;