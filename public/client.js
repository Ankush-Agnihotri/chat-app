const socket = io();

let username;
let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message-area");

do {
  username = prompt("Enter you name:");
} while (!username);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value.trim());
  }
});

function sendMessage(message) {
  let msg = {
    user: username,
    message: message,
  };

  //apppend message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");

  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `<h4>${msg.user}</h4>
  <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

//receive messages

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

//scroll to bottom functon

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
