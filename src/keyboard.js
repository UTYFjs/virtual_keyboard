import keyData from './keyData';

export default class Keyboard {
  constructor() {
    this.value = null;
    this.capslock = false;
    this.shift = false;
    this.ctrl = false;
    this.alt = false;
    this.lang = 'en';

    this.down = { en: [], ru: [] };
    this.caps = { en: [], ru: [] };
    this.shiftArr = { en: [], ru: [] };
  }

  init() {
    const title = document.createElement('h1');
    const textArea = document.createElement('textarea');
    const description = document.createElement('p');
    title.classList.add('title');
    textArea.classList.add('textarea');
    description.classList.add('description');
    textArea.setAttribute('type', 'textarea');
    title.setAttribute('data-title', 'titleH1');
    title.innerText = 'Virtual Keyboard';
    description.innerText = 'Change language: Ctrl + Alt. Keyboard made for Windows';
    document.body.append(title);
    document.body.append(textArea);
    document.body.append(description);
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else { localStorage.setItem('lang', this.lang); }
    this.createKeys(keyData);
    this.getStorage(keyData);
  }

  createKeys(keyData_) {
    const keyboardBody = document.createElement('div');
    keyboardBody.classList.add('keyboard');
    document.body.append(keyboardBody);
    keyData_.forEach((item) => {
      const row = document.createElement('div');
      row.classList.add('row');
      keyboardBody.append(row);
      for (let j = 0; j < item.length; j += 1) {
        const key = document.createElement('div');
        const classKey = Object.entries(item[j]);
        key.classList.add('key', `${classKey[0][0]}`);
        key.setAttribute('data-code', `${classKey[0][0]}`);
        const objKey = classKey[0][1];
        const currentLang = this.lang;
        if (this.capslock === false) {
          key.innerText = `${objKey[currentLang].down}`;
        } else {
          key.innerText = `${objKey[currentLang].caps}`;
        }
        row.append(key);
      }
    });
  }

  getStorage(keyData_) {
    keyData_.forEach((item) => {
      for (let j = 0; j < item.length; j += 1) {
        const classKey = Object.entries(item[j]);
        const objKey = classKey[0][1];
        if (this.lang === 'en') {
          this.down.en.push(`${objKey.en.down}`);
          this.caps.en.push(`${objKey.en.caps}`);
          this.shiftArr.en.push(`${objKey.en.shift}`);
        } else {
          this.down.ru.push(`${objKey.ru.down}`);
          this.caps.ru.push(`${objKey.ru.caps}`);
          this.shiftArr.ru.push(`${objKey.ru.shift}`);
        }
      }
    });
  }

  changeShift() {
    const keys = document.querySelectorAll('.key');
    for (let i = 0; i < keys.length; i += 1) {
      if (this.shift) {
        keys[i].textContent = this.shiftArr[this.lang][i];
      } else { keys[i].textContent = this.down[this.lang][i]; }
    }
  }

  switchCapsLock() {
    this.capslock = !this.capslock;
  }

  switchShift() {
    this.shift = !this.shift;
  }

  checkAlt() {
    if (this.alt) {
      this.alt = false;
      document.querySelector('.AltLeft').classList.remove('active');
      document.querySelector('.AltRight').classList.remove('active');
    }
  }

  checkCtrl() {
    if (this.ctrl) {
      this.ctrl = false;
      document.querySelector('.ControlLeft').classList.remove('active');
      document.querySelector('.ControlRight').classList.remove('active');
    }
  }

  checkShift() {
    if (this.shift) {
      this.shift = false;
      this.changeShift();
      document.querySelector('.ShiftLeft').classList.remove('active');
      document.querySelector('.ShiftRight').classList.remove('active');
    }
  }
}
