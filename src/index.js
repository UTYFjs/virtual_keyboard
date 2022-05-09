import './style/style.css';

import Keyboard from './keyboard';

// console.log(keyData);

// document.onkeydown = function (event) {
//  console.log(event);
// };

const keyboard = new Keyboard();
keyboard.init();

const main = document.querySelector('.keyboard');
const textArea = document.querySelector('.textarea');
main.addEventListener('mousedown', (event) => {
  // main.forEach( (key) => )
  textArea.focus();
  const currentKey = document.querySelector(`.${event.target.dataset.code}`);
  switch (currentKey.textContent) {
    case 'Backspace':
      const str = textArea.value;
      const newStr = str.slice(0, str.length - 1);
      textArea.value = newStr;

      break;
    case 'Tab':
      textArea.value += '\t';
      break;
    case 'CapsLock':
      keyboard.switchCapsLock();
      break;
    case 'Enter':
      textArea.value += '\n';
      break;
    default: textArea.value += `${currentKey.textContent}`;
  }

  currentKey.classList.add('active');
});
main.addEventListener('mouseup', (event) => {
  // main.forEach( (key) => )

  const currentKey = document.querySelector(`.${event.target.dataset.code}`);

  currentKey.classList.remove('active');
});
document.addEventListener('keydown', (event) => {
  // main.forEach( (key) => )
  textArea.focus();
  // console.log(event);
  const currentKey = document.querySelector(`.${event.code}`);
  // console.log(currentKey);
  if (event.code === 'Tab') event.preventDefault();
  currentKey.classList.add('active');
});
document.addEventListener('keyup', (event) => {
  // main.forEach( (key) => )
  // console.log(event);
  const currentKey = document.querySelector(`.${event.code}`);
  // console.log(currentKey);
  currentKey.classList.remove('active');
});

/* const title = document.createElement('h1');
const textArea = document.createElement('textarea');
const keyboardBody = document.createElement('div');

title.classList.add('title');
textArea.classList.add('textarea');
keyboardBody.classList.add('keyboard');

textArea.setAttribute('type', 'textarea');
title.setAttribute('data-title', 'titleH1');
title.innerText = 'Virtual Keyboard';
console.log(title);
document.body.append(title);
document.body.append(textArea);
document.body.append(keyboardBody);

keyData.forEach( (item) => {

let row = document.createElement('div');
row.classList.add('row');
keyboardBody.append(row);
for(let j=0; j<item.length; j++){
let key = document.createElement('div');
let classKey = Object.entries(item[j]);

console.log(classKey[0][0]);
//let strClass = String(classKey[0]);
//console.log(strClass);
key.classList.add('key', `${classKey[0][0]}`);
key.innerText = `${classKey[0][0]}`;
row.append(key);
}

}
); */

// document.mousedown = function (event) {
// console.log(event);
//  };

/* class NewKey {
constructor(keyCode, keyRU, KeyEN) {
  this.keyCode = value.code;
  this.keyRU = ;
  this.keyEN = ;
}
  }
  const arrKey = [];
  function getArrKeyCode (event){
let eventObj = document.onkeydown;
let myObj = new NewKey(eventObj.code, eventObj.key);
return myObj;
  } */

// console.log('Hello World!');
