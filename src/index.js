import './style/style.css';
import keyData from './keyData';
import Keyboard from './keyboard';

const keyboard = new Keyboard();
keyboard.init();

const main = document.querySelector('.keyboard');
const textArea = document.querySelector('.textarea');

function changeLanguage() {
  const keys = document.querySelectorAll('.key');

  for (let i = 0; i < keys.length; i += 1) {
    if (keyboard.capslock) {
      keys[i].textContent = keyboard.caps[i];
    } else { keys[i].textContent = keyboard.down[i]; }
  }
}
function changeShift() {
  const keys = document.querySelectorAll('.key');

  for (let i = 0; i < keys.length; i += 1) {
    if (keyboard.shift) {
      keys[i].textContent = keyboard.shiftArr[i];
    } else { keys[i].textContent = keyboard.down[i]; }
  }
}
keyboard.getStorage(keyData);

main.addEventListener('mousedown', (event) => {
  textArea.focus();
  const currentKey = document.querySelector(`.${event.target.dataset.code}`);
  switch (currentKey.textContent) {
    case 'Backspace':
      textArea.value = textArea.value.slice(0, textArea.value.length - 1);
      currentKey.classList.add('active');
      break;
    case 'Tab':
      textArea.value += '\t';
      currentKey.classList.add('active');
      break;
    case 'CapsLock':
      keyboard.switchCapsLock();
      changeLanguage();
      currentKey.classList.toggle('active');
      break;
    case 'Enter':
      textArea.value += '\n';
      currentKey.classList.add('active');
      break;
    case 'Shift':
      keyboard.switchShift();
      changeShift();
      currentKey.classList.toggle('active');
      break;
    case 'Ctrl':
      currentKey.classList.add('active');
      break;
    case 'Alt':
      currentKey.classList.add('active');
      break;
    case 'Win':
      currentKey.classList.add('active');
      break;
    case 'Del':
      currentKey.classList.add('active');
      break;

    default: textArea.value += `${currentKey.textContent}`;
      currentKey.classList.add('active');
  }
});

main.addEventListener('mouseup', (event) => {
  const currentKey = document.querySelector(`.${event.target.dataset.code}`);
  switch (currentKey.textContent) {
    case 'CapsLock':
      break;
    case 'Shift':
      break;
    default: currentKey.classList.remove('active');
  }
});
document.addEventListener('keydown', (event) => {
  textArea.focus();
  const currentKey = document.querySelector(`.${event.code}`);

  switch (event.code) {
    case 'Backspace':
      currentKey.classList.add('active');
      break;
    case 'Tab':
      event.preventDefault();
      textArea.value += '\t';
      currentKey.classList.add('active');
      break;
    case 'CapsLock':
      event.preventDefault();
      keyboard.switchCapsLock();
      changeLanguage();
      currentKey.classList.toggle('active');
      break;
    case 'Enter':
      currentKey.classList.add('active');
      break;
    case 'ShiftLeft':
      event.preventDefault();
      keyboard.switchShift();
      changeShift();
      currentKey.classList.toggle('active');
      break;
    case 'ShiftRight':
      event.preventDefault();
      keyboard.switchShift();
      changeShift();
      currentKey.classList.toggle('active');
      break;
    case 'ControlLeft':
      event.preventDefault();
      currentKey.classList.add('active');
      break;
    case 'MetaLeft':
      event.preventDefault();
      currentKey.classList.add('active');
      break;
    case 'AltLeft':
      event.preventDefault();
      currentKey.classList.add('active');
      break;
    case 'AltRight':
      event.preventDefault();
      currentKey.classList.add('active');
      break;
    case 'ControlRight':
      event.preventDefault();
      currentKey.classList.add('active');
      break;
    case 'Delete':
      currentKey.classList.add('active');
      break;
    case 'ArrowLeft':
      currentKey.classList.add('active');
      break;
    case 'ArrowDown':
      currentKey.classList.add('active');
      break;
    case 'ArrowRight':
      currentKey.classList.add('active');
      break;
    case 'ArrowUp':
      currentKey.classList.add('active');
      break;
    default: event.preventDefault();
      textArea.value += `${currentKey.textContent}`;
      currentKey.classList.add('active');
  }
});
document.addEventListener('keyup', (event) => {
  const currentKey = document.querySelector(`.${event.code}`);
  switch (event.code) {
    case 'CapsLock':
      break;
    case 'ShiftLeft':
      break;
    case 'ShiftRight':
      break;
    default: currentKey.classList.remove('active');
  }
});
