const socket = io();
let userName;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector(".message__area")


do{
    userName = prompt("Please enter your name:")
}while(!userName)
document.getElementById('chatHeading').innerText = userName;

textArea.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: userName,
        message: message.trim(),
        time: getCurrentTime(),
    }
    // append message
    appendMessage(msg,'outgoing')
    textArea.value = "";
    scrollToBottom();

    // Send to server
    socket.emit('message', msg);
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className,'message');
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <h6>${msg.time}</h6>
    `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// recieve message from server
socket.on('message', (msg) => {
    appendMessage(msg,'incoming');
    scrollToBottom();
});

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}