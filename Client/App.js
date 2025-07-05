const socket = io('http://localhost:3000');
const chat = document.getElementById('chat');
const form = document.getElementById('form');

// Join chat
const name = prompt('Enter your name (e.g. Farmer John)') || 'Anonymous';
socket.emit('join', name);

// Send message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  socket.emit('sendMessage', input.value);
  input.value = '';
});

// Receive messages
socket.on('message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  chat.appendChild(li);
});
