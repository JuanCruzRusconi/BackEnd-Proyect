// Conexion Socket
console.log("hola front");

const addProductForm = document.getElementById("addProduct");

const socket = io();

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const status = document.getElementById('status').value;
    const category = document.getElementById('category').value;
    
    socket.emit("newProd", {title, description, price, thumbnail, code, stock, status, category});
/*
    socket.on("connection", (socket)=>{
    
        socket.on("products", async (data)=>{
        const {title, description, price, code, stock} = data
        let lista = document.getElementById("products");
        //let productos = ""
        let productos = `<div>
                            <ul>
                                <li>Nombre: ${title}</li>
                                <li>Descripcion: ${description}</li>
                                <li>Precio: ${price}</li>
                                <li>Code: ${code}</li>
                                <li>Stock: ${stock}</li>
                            </ul>
                         </div>`;
                                 
        lista.innerHTML = productos;
        })
    })   
*/
    let lista = document.getElementById("products");
    //let productos = ""
    let productos = `<div>
                        <ul>
                            <li>Nombre: ${title}</li>
                            <li>Descripcion: ${description}</li>
                            <li>Precio: ${price}</li>
                            <li>Code: ${code}</li>
                        </ul>
                     </div>`;
                             
    lista.innerHTML = productos;

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('code').value = ''; 
    document.getElementById('stock').value = '';
    document.getElementById('status').value = '';
    document.getElementById('category').value = '';   
});

/*
socket.on("saludo", (data) => {
    console.log(`mensaje del servidor: ${data}`);
});

socket.emit()

socket.on("enviarProduct", (data) => {
    let subir = document 
})

function alertar() {
    let input = document.getElementById("textBox");
    socket.emit("algo", input.value);
}
*/
