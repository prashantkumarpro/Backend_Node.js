import EventEmitter from 'events';

const event = new EventEmitter();

const greetMessages = ['Hello', 'Hi', 'Namaste', 'Hey there'];

event.on('greet', (msg) => {
  console.log(msg);
});

greetMessages.forEach((msg) => {
  event.emit('greet', msg);
});

event.emit('abc')