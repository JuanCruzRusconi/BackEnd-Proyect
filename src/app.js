import express from "express"
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productManager = new ProductManager("./products.json");

app.get("/api/products", async (req, res) => {
    try {  
    const { limit, price } = req.query;

    const products = await productManager.getProducts()
    
    res.send(limit ? 
        products.slice(0, limit) 
        : products
        || 
        price ? 
        products.filter((product) => product.price == price) 
        : 
        products)
    } catch {
        res.status(502).send({error : true})
    }
})

app.get("/api/product/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params
    //const productId = products.find((product) => product.id == pid)
    const products = await productManager.getProducts()
    res.send(products.find((product) => product.id == pid));
    //res.send(productId);
    } catch {
        res.status(502).send({error : true})
    }
})

app.post("/api/products", async (req, res) => {

    const body = req.body;
    //res.send(body);

    try {
        const addNewProduct = await productManager.addProduct(body);
        res.send(addNewProduct);
    } catch {
        res.status(502).send({error : true})
    }
});

app.put("/api/product/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params;
    const product = req.body; 
    const toUpdate = await productManager.updateProduct(pid, product);
    res.send(getProducts());
    } catch {
        res.status(502).send({error : true})
    }
})

app.delete("/api/product/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    res.send({delete: true});
    } catch {
        res.status(502).send({error : true})
    }
})


app.listen(8080, () => {
    console.log("escuchando")
})

/*
{
    "title": "",
    "descriptio": "",
    "price": 70000,
    "thumbnail": "",
    "code": 4444,
    "stock": 300
}
*/