/*CartManager.js

import cartsModel from "../../schemas/carts.schema.js";

export default class CartManager {
  getCarts = async () => {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (e) {
      return [];
    }
  };

  getCartById = async (cid) => {
    try {
      const get = await cartsModel.findOne({ _id: cid });
      return get;
    } catch (e) {
      console.log(e);
    }
  };

  addCart = async (cart) => {
    const { products } = cart;

    try {
      const add = await cartsModel.create([cart]);
      return add;
    } catch (e) {
      console.log(e);
    }
  };

  addProductInCartById = async (cidCart, productById) => {
    try {
      const filter = { _id: cidCart, "products._id": productById };
      const cart = await cartsModel.findById(cidCart).lean();
      if (cart.products.find((p) => p._id == productById._id.toString())) {
        const update = {
          $inc: { "products.$.quantity": 1 },
        };
        await cartsModel.findOneAndUpdate(filter, update);
      } else {
        const update2 = {
          $push: {
            products: { _id: productById._id, quantity: 1 },
          },
        };
        await cartsModel.findOneAndUpdate({ _id: cidCart }, update2);
      }

      return await cartsModel.findById(cidCart);
    } catch (e) {
      console.log(e);
    }
  };
}




2) ProductManager.js: 

import productsModel from "../../schemas/products.schema.js";
export default class ProductManager {
  getProducts = async () => {
    try {
      const products = await productsModel.find();
      return products;
    } catch (e) {
      return [];
    }
  };

  addProduct = async (product) => {
    const { title, description, price, thumbnail, code, stock } = product;
    const valid = await productsModel.findOne({ code: code }).lean();

    if (valid) {
      return "code existente";
    }

    try {
      const add = await productsModel.create([product]);
      return add;
    } catch (e) {
      console.log(e);
    }
  };

  getProductById = async (productId) => {
    try {
      const get = await productsModel.findById(productId);
      return get;
    } catch (e) {
      console.log(e);
    }
  };

  updateProduct = async (id, product) => {
    try {
      const update = await productsModel.findByIdAndUpdate(id, product);
      return update;
    } catch (e) {
      console.log(e);
    }
  };

  deleteProduct = async (id) => {
    try {
      const deleteProd = await productsModel.findByIdAndDelete(id);
      return deleteProd;
    } catch (e) {
      console.log(e);
    }
  };
}



3) carts.js: (1)

import { Router } from "express";
import CartManager from "../dao/mongoDB/CartManager.js";
import ProductManager from "../dao/mongoDB/ProductManager.js";

const cartManager = new CartManager("carts");
const productManager = new ProductManager("products");

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const createCart = await cartManager.addCart(body);
    res.send(createCart);
  } catch {
    res.status(502).send({ error: true });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cidCart = req.params.cid;
    let productById = req.params.pid;
    res.send(
      await cartManager.addProductInCartById(
        await cartManager.getCartById(cidCart),
        await productManager.getProductById(productById)
      )
    );
  } catch {
    res.status(502).send({ error: true });
  }
});

cartsRouter.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.send(carts);
  } catch {
    res.status(502).send({ error: true });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartManager.getCartById(cid);
    res.send(carts);
  } catch {
    res.status(502).send({ error: true });
  }
});

export default cartsRouter;


4) products.js: (0)

import { Router } from "express";
import ProductManager from "../dao/mongoDB/ProductManager.js";

const productManager = new ProductManager("products");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit, price } = req.query;
    const products = await productManager.getProducts();
    res.send(
      products
    );
  } catch {
    res.status(502).send({ error: true });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    //const productId = products.find((product) => product.id == pid)
    const product = await productManager.getProductById(pid);
    //res.send(products.find((product) => product.id == pid));
    res.send(product);
  } catch {
    res.status(502).send({ error: true });
  }
});

productsRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const addNewProduct = await productManager.addProduct(body);
    //const mongo = await productsModel.insertMany([body]);
    res.send(addNewProduct);
  } catch {
    res.status(502).send({ error: true });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    await productManager.updateProduct(pid, product);
    res.send(await productManager.getProducts());
  } catch {
    res.status(502).send({ error: true });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    res.send({ delete: true });
  } catch {
    res.status(502).send({ error: true });
  }
});

export default productsRouter;



5) cart.schema.js:

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;

/*
{
    "id":1,
    "products":[
        {"id":1,"quantity":1}
    ]
}



Con estos cambios ya tendrias los endpoints principales andando, pero hace falta aplicar el filtro por querys en la consulta del getProducts, la parte de pagination y las vista de products. Te dejo para que puedas seguir avanzando. Saludos
*/