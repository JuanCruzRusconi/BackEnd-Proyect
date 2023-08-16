// FRONT

function createMessage (msg) {
    
    return `<div class="chat-message">
          <div class="flex items-end">
            <div
              class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
            >
              <span class="brand-color">${msg.name}</span>
              <div>
                <span
                  class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                  >${msg.text}</span
                >
              </div>
            </div>
          </div>
        </div>`
};

function createOwnMessage (msg) {
    
    return `<div class="chat-message">
    <div class="flex items-end justify-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
      >
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
            >${msg}</span
          >
        </div>
      </div>
    </div>
  </div>`
};

// A EDITAR

const socket = io();

socket.on("historial", (data) => {
    console.log(data)

    const msgHtml = data.map((msg) => createMessage(msg));
    $("#messages").html(msgHtml.join(" "));
});

socket.on("getMessage", (msg) => {
  console.log(`mensaje entrante: `, msg);
  $("#messages").append(createMessage(msg));
});

$(function () {
  $("#formEvent").on("submit", function (evento) {
    evento.preventDefault();
    console.log(evento);
  });
  $("#sendMsg").on("click", function () {
    const input = $("#message").val();
    $("#message").val("");
    socket.emit("sendMessage", input);

    $("#messages").append(createOwnMessage(input));
  });

  $("#message").on("keyup", function (event) {
    if (event.key == "Enter") {
      const input = $("#message").val();
      $("#message").val("");
      socket.emit("sendMessage", input);

      $("#messages").append(createOwnMessage(input));
    }
  });
});

const inputBox = document.getElementById("message");

inputBox.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.key == "Enter") {
    socket.emit("sendMessage", inputBox.value);
    $("#messages").append(createOwnMessage(inputBox.value));
    inputBox.value = "";
  }
});

/*
const form = document.getElementById("formEvent");

form.addEventListener("submit", function(evento){
  console.log(evento);
  evento.preventDefault();
});

const placeHolder = document.getElementById("message");
const sendButton = document.getElementById("sendMsg")
const placeHolderValue = placeHolder.value();

placeHolder.addEventListener("click", showMsg());
function showMsg(){
  console.log(inputBox.value);
  socket.emit("sendMessage2", inputBox.value);

};
*/
console.log("hola")
/*socket.on("getMessage2", (data) => {
  console.log(`mensaje entrante NUEVO: `, data);
  $("#messages").append(createMessage(data));
});
*/
