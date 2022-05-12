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
      keys[i].textContent = keyboard.caps[keyboard.lang][i];
    } else { keys[i].textContent = keyboard.down[keyboard.lang][i]; }
  }
}
function ctrlAlt() {
  if (keyboard.alt && keyboard.ctrl) {
    if (keyboard.lang === 'ru') {
      keyboard.lang = 'en';
    } else { keyboard.lang = 'ru'; }

    keyboard.getStorage(keyData);
    changeLanguage();
    localStorage.lang = keyboard.lang;
  }
}
function changeShift() {
  const keys = document.querySelectorAll('.key');
  for (let i = 0; i < keys.length; i += 1) {
    if (keyboard.shift) {
      keys[i].textContent = keyboard.shiftArr[keyboard.lang][i];
    } else { keys[i].textContent = keyboard.down[keyboard.lang][i]; }
  }
}
keyboard.getStorage(keyData);

main.addEventListener('mousedown', (event) => {
  textArea.focus();
  const currentKey = document.querySelector(`.${event.target.dataset.code}`);
  const currentKeys = document.querySelectorAll('.key');
  let checkKeyInKeyboard = false;
  for (let i = 0; i < currentKeys.length; i += 1) {
    if (event.target.dataset.code === currentKeys[i].dataset.code) {
      checkKeyInKeyboard = true;
    }
  }
  if (checkKeyInKeyboard) {
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
        currentKey.classList.toggle('active');
        keyboard.switchCapsLock();
        changeLanguage();
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
        currentKey.classList.toggle('active');
        if (currentKey.matches('.active')) {
          keyboard.ctrl = true;
        } else { keyboard.ctrl = false; }
        if (keyboard.ctrl && keyboard.alt) {
          ctrlAlt();
        }
        break;
      case 'Alt':
        currentKey.classList.toggle('active');
        if (currentKey.matches('.active')) {
          keyboard.alt = true;
        } else { keyboard.alt = false; }
        if (keyboard.ctrl && keyboard.alt) {
          ctrlAlt();
        }
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
  }
});

main.addEventListener('mouseup', (event) => {
  const currentKey = document.querySelector(`.${event.target.dataset.code}`);
  const currentKeys = document.querySelectorAll('.key');
  let checkKeyInKeyboard = false;
  for (let i = 0; i < currentKeys.length; i += 1) {
    if (event.target.dataset.code === currentKeys[i].dataset.code) {
      checkKeyInKeyboard = true;
    }
  }
  if (checkKeyInKeyboard) {
    switch (currentKey.textContent) {
      case 'CapsLock':
        keyboard.checkAlt();
        keyboard.checkCtrl();
        keyboard.checkShift();
        break;
      case 'Alt':
        if (keyboard.ctrl && keyboard.alt) {
          keyboard.ctrl = false;
          keyboard.alt = false;
          const ctrlLeft = document.querySelector('.ControlLeft');
          const ctrlRight = document.querySelector('.ControlRight');
          ctrlLeft.classList.remove('active');
          ctrlRight.classList.remove('active');
          currentKey.classList.remove('active');
        }
        keyboard.checkCtrl();
        keyboard.checkShift();
        break;
      case 'Ctrl':
        if (keyboard.ctrl && keyboard.alt) {
          keyboard.ctrl = false;
          keyboard.alt = false;
          const altLeft = document.querySelector('.AltLeft');
          const altRight = document.querySelector('.AltRight');
          altLeft.classList.remove('active');
          altRight.classList.remove('active');
          currentKey.classList.remove('active');
          currentKey.classList.remove('active');
        }
        keyboard.checkAlt();
        keyboard.checkShift();
        break;
      case 'Shift':
        keyboard.checkAlt();
        keyboard.checkCtrl();
        break;
      default: currentKey.classList.remove('active');
        keyboard.checkAlt();
        keyboard.checkCtrl();
        keyboard.checkShift();
    }
  }
});
document.addEventListener('keydown', (event) => {
  textArea.focus();
  const currentKey = document.querySelector(`.${event.code}`);
  const currentKeys = document.querySelectorAll('.key');
  let checkKeyInKeyboard = false;
  for (let i = 0; i < currentKeys.length; i += 1) {
    if (event.code === currentKeys[i].dataset.code) {
      checkKeyInKeyboard = true;
    }
  }
  if (checkKeyInKeyboard) {
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
        if (currentKey.matches('.active')) {
          keyboard.ctrl = true;
        } else { keyboard.ctrl = false; }
        if (keyboard.ctrl && keyboard.alt) {
          ctrlAlt();
        }
        break;
      case 'MetaLeft':
        event.preventDefault();
        currentKey.classList.add('active');
        break;
      case 'AltLeft':
        event.preventDefault();
        currentKey.classList.add('active');
        if (currentKey.matches('.active')) {
          keyboard.alt = true;
        } else { keyboard.alt = false; }
        if (keyboard.ctrl && keyboard.alt) {
          ctrlAlt();
        }
        break;
      case 'AltRight':
        event.preventDefault();
        currentKey.classList.add('active');
        if (currentKey.matches('.active')) {
          keyboard.alt = true;
        } else { keyboard.alt = false; }
        if (keyboard.ctrl && keyboard.alt) {
          ctrlAlt();
        }
        break;
      case 'ControlRight':
        event.preventDefault();
        currentKey.classList.add('active');
        if (currentKey.matches('.active')) {
          keyboard.ctrl = true;
        } else { keyboard.ctrl = false; }
        if (keyboard.ctrl && keyboard.alt) {
          ctrlAlt();
        }
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
  }
});
document.addEventListener('keyup', (event) => {
  const currentKey = document.querySelector(`.${event.code}`);
  const currentKeys = document.querySelectorAll('.key');
  let checkKeyInKeyboard = false;
  for (let i = 0; i < currentKeys.length; i += 1) {
    if (event.code === currentKeys[i].dataset.code) {
      checkKeyInKeyboard = true;
    }
  }
  if (checkKeyInKeyboard) {
    switch (event.code) {
      case 'CapsLock':
        keyboard.checkAlt();
        keyboard.checkCtrl();
        keyboard.checkShift();
        break;
      case 'ShiftLeft':
        keyboard.checkAlt();
        keyboard.checkCtrl();
        break;
      case 'ShiftRight':
        keyboard.checkAlt();
        keyboard.checkCtrl();
        break;
      case 'AltLeft':
        if (keyboard.ctrl && keyboard.alt) {
          keyboard.ctrl = false;
          keyboard.alt = false;
          const ctrlLeft = document.querySelector('.ControlLeft');
          const ctrlRight = document.querySelector('.ControlRight');
          ctrlLeft.classList.remove('active');
          ctrlRight.classList.remove('active');
          currentKey.classList.remove('active');
        }
        currentKey.classList.remove('active');
        keyboard.checkShift();
        break;
      case 'AltRight':
        if (keyboard.ctrl && keyboard.alt) {
          keyboard.ctrl = false;
          keyboard.alt = false;
          const ctrlLeft = document.querySelector('.ControlLeft');
          const ctrlRight = document.querySelector('.ControlRight');
          ctrlLeft.classList.remove('active');
          ctrlRight.classList.remove('active');
          currentKey.classList.remove('active');
        }
        currentKey.classList.remove('active');
        keyboard.checkShift();
        break;
      case 'ControlLeft':
        if (keyboard.ctrl && keyboard.alt) {
          keyboard.ctrl = false;
          keyboard.alt = false;
          const altLeft = document.querySelector('.AltLeft');
          const altRight = document.querySelector('.AltRight');

          altLeft.classList.remove('active');
          altRight.classList.remove('active');
          currentKey.classList.remove('active');
        }
        currentKey.classList.remove('active');
        keyboard.checkShift();
        break;
      case 'ControlRight':
        if (keyboard.ctrl && keyboard.alt) {
          keyboard.ctrl = false;
          keyboard.alt = false;
          const altLeft = document.querySelector('.AltLeft');
          const altRight = document.querySelector('.AltRight');

          altLeft.classList.remove('active');
          altRight.classList.remove('active');
          currentKey.classList.remove('active');
        }
        currentKey.classList.remove('active');
        keyboard.checkShift();
        break;

      default: currentKey.classList.remove('active');
        keyboard.checkAlt();
        keyboard.checkCtrl();
        keyboard.checkShift();
    }
  }
});
