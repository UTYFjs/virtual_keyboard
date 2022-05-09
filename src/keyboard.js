import keyData from './keyData';

export default class Keyboard {
  constructor() {
    this.value = null;
    this.capslock = false;
    this.shift = false;
    this.ctrlR = false;
    this.altL = false;
    this.down = [];
    this.caps = [];
    this.shiftArr = [];
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
    description.innerText = 'Change language: Shift Left + Alt Left. Keyboard made for Windows';
    document.body.append(title);
    document.body.append(textArea);
    document.body.append(description);

    this.createKeys(keyData);
    // this.pressKey();
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

        // console.log(classKey[0][0]);
        // let strClass = String(classKey[0]);
        // console.log(strClass);
        // const code = classKey[0][0];
        // item[j].code.ru.down;
        key.classList.add('key', `${classKey[0][0]}`);
        key.setAttribute('data-code', `${classKey[0][0]}`);
        // const charEn = Object.entries(item[j]);
        const objKey = classKey[0][1];
        if (this.capslock === false) {
          key.innerText = `${objKey.en.down}`;
        } else {
          key.innerText = `${objKey.en.caps}`;
        }

        // key.innerText = `${classKey[0][0]}`;
        row.append(key);
      }
    });
  }

  getStorage(keyData_) {
    keyData_.forEach((item) => {
      for (let j = 0; j < item.length; j += 1) {
        const classKey = Object.entries(item[j]);
        const objKey = classKey[0][1];
        // console.log(objKey.en.caps);
        this.down.push(`${objKey.en.down}`);
        this.caps.push(`${objKey.en.caps}`);
        this.shiftArr.push(`${objKey.en.shift}`);
      }
    });
  }

  switchCapsLock() {
    this.capslock = !this.capslock;
  }

  switchShift() {
    this.shift = !this.shift;
  }
  /* pressKey() {
        console.log(this.code);
        let code = event.code;
        console.log(code);
        document.querySelector(`${'.' + code}`).classList.add('.active');

    } */
}
