import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
console.log(process.env.PORT);

const requester = supertest(`http://localhost:9000/api`);

describe(
    "Testeando los recursos de la API de mi BackEnd proyect.",
    () => {
        describe("Testeando Carts", () => {
            let cid = null;
            it("CREATE: Testeando que se crea un carrito y devuelve el objeto completo del nuevo documento", async() => {
                let response = await requester.post("/carts");
                let { _body, statusCode } = response;
                cid = _body._id;
                expect(statusCode).to.be.equals(201);    
            })
            it("READ: Testeando que la lectura devuelve todos los carritos", async() => {
              const response = await requester.get("/carts");
              const { statusCode } = response;
              expect(statusCode).to.be.equals(200);
            })
            it("READ_ONE: Testeando que la lectura devuelve el carrito solicitado", async() => {
                const response = await requester.get("/carts/"+cid);
                const { _body } = response;
                onsole.log(_body);
                expect(_body.response).to.have.property("response");
            })
            it("UPDATE: Testeando que el carrito solicitado se actualiza correctamente", async() => {
                let data = { _id: "64dc35e9b1a6f4bbfbf63db4", quantity: 2 };  
                const response = await requester.put("/carts/"+cid).send(data);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("DESTROY: Testeando que el carrito solicitado se elimina correctamente", async() => {
                const response = await requester.delete("/carts/"+cid)
                const { _body } = response
                expect(_body.message).to.be.equals("Cart deleted")
            })
        })
        describe("Testeando Products", () => {
            let pid = null;
            it("CREATE: Testeando que se crea un producto y devuelve el objeto completo del nuevo documento", async() => {
                const response = await requester.post("/products");
                let { _body, statusCode } = response;
                pid = _body._id;
                expect(statusCode).to.be.equals(201);   
            })
            it("GET: Testeando que la lectura devuelve el producto solicitado", async() => {
                const response = await requester.get("/products/"+pid);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("GET_ONE: Testeando que la lectura devuelve todos los productos", async() => {
                const response = await requester.get("/products");
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("UPDATE: Testeando que el producto solicitado se actualiza correctamente", async() => {
                const data = { products: [quantity = 25] }
                const response = await requester.put("/products/"+pid).send(data);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("DESTROY: Testeando que el producto solicitado se elimina correctamente", async() => {
                const response = await requester.delete("/products/"+pid)
                const { _body } = response
                expect(_body.message).to.be.equals("Cart deleted")
            })
        })
        describe("Testeando Tickets", () => {
          let pid = null;
            it("CREATE: Testeando que se crea un ticket y devuelve el objeto completo del nuevo documento", async() => {
                const response = await requester.post("/tickets");
                const { _body } = response;
                expect(_body.staus).to.be.equals("success");    
            })
            it("GET: Testeando que la lectura devuelve el ticket solicitado", async() => {
                const response = await requester.get("/tickets/"+pid);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("GET_ONE: Testeando que la lectura devuelve todos los tickets", async() => {
                const response = await requester.get("/tickets");
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("UPDATE: Testeando que el ticket solicitado se actualiza correctamente", async() => {
                const data = { products: [quantity = 25] }
                const response = await requester.put("/tickets/"+pid).send(data);
                const { statusCode } = response;
                expect(statusCode).to.be.equals(200);
            })
            it("DESTROY: Testeando que el ticket solicitado se elimina correctamente", async() => {
                const response = await requester.delete("/tickets/"+pid)
                const { _body } = response
                expect(_body.message).to.be.equals("Ticket deleted.")
            })
            it("PAYMENT: Testeando que se efectua la compra de un ticket y devuelve el intento de pago", async() => {
                const response = await requester.post("/tickets/payemnts/"+pid+"/payment-intents");
                const { _body } = response;
                expect(_body.status).to.be.equals("success");    
            })
        })
        describe("Testeando Auth", () => {
            let uid = null;
            let pid = null;
            let cookie = null;
            it("Testeando que se registra un usuario correctamente", async () => {
                const data = {
                name: "Juan Cruz",
                surname: "Rusconi",
                username: "juancruz1234",
                email: "juanrusconi@gmail.com",
                password: "1234",
                };
                const response = await requester.post("/auth/register").send(data);
                const { _body, statusCode } = response;
                uid = _body.payload;
                expect(statusCode).to.be.equals(201);
            });
            it("Testeando que el usuario inicia sesión correctamente", async () => {
                const data = { username: "juancruz1234", password: "1234" };
                const response = await requester.post("/auth/login").send(data);
                const { headers } = response;
                //console.log(headers["set-cookie"][0]);
                cookie = {
                name: headers["set-cookie"][0].split("=")[0],
                value: headers["set-cookie"][0].split("=")[1],
                };
                expect(cookie.name).to.be.equals("accessToken");
                expect(cookie.value).to.be.ok;
            });
            it("Testeando que el usuario obtiene su sesion correctamente", async () => {
                const response = await requester.get("/auth/session/current");
                const { _body } = response;
                expect(_body.status).to.be.equals("success");  
            });
            it("Testeando que el usuario cambia de rol correctamente", async () => {
                const response = await requester.post("/auth/user/premium");
                const { _body } = response;
                expect(_body.status).to.be.equals("success");  
            });
            it("Testeando que el usuario cierra sesion correctamente", async () => {
                const response = await requester.post("/signout");
                const { _body } = response;
                expect(_body.status).to.be.equals("success");  
            });
        })
    }
)