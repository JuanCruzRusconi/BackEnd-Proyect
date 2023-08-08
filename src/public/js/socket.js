// Conexion Socket

const socket = socketServer();

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