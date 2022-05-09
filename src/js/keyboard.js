import Key from './key';

export default class Keyboard {
  constructor(area, language) {
    this.english = [['`', 'Backquote'], ['1', 'Digit1'], ['2', 'Digit2'], ['3', 'Digit3'], ['4', 'Digit4'], ['5', 'Digit5'],
      ['6', 'Digit6'], ['7', 'Digit7'], ['8', 'Digit8'], ['9', 'Digit9'], ['0', 'Digit0'], ['-', 'Minus'], ['=', 'Equal'],
      ['Backspace', 'Backspace', 3],
      ['Tab', 'Tab', 2], ['q', 'KeyQ'], ['w', 'KeyW'], ['e', 'KeyE'], ['r', 'KeyR'], ['t', 'KeyT'], ['y', 'KeyY'], ['u', 'KeyU'],
      ['i', 'KeyI'], ['o', 'KeyO'], ['p', 'KeyP'], ['[', 'BracketLeft'], [']', 'BracketRight'], ['\\', 'Backslash'], ['Del', 'Delete'],
      ['CapsLock', 'CapsLock', 3], ['a', 'KeyA'], ['s', 'KeyS'], ['d', 'KeyD'], ['f', 'KeyF'], ['g', 'KeyG'], ['h', 'KeyH'], ['j', 'KeyJ'],
      ['k', 'KeyK'], ['l', 'KeyL'], [';', 'Semicolon'], ['\'', 'Quote'], ['Enter', 'Enter', 3],
      ['Shift', 'ShiftLeft', 3], ['z', 'KeyZ'], ['x', 'KeyX'], ['c', 'KeyC'], ['v', 'KeyV'], ['b', 'KeyB'], ['n', 'KeyN'], ['m', 'KeyM'],
      [',', 'Comma'], ['.', 'Period'], ['/', 'Slash'], ['↑', 'ArrowUp'], ['Shift', 'ShiftRight', 3],
      ['Ctrl', 'ControlLeft', 3], ['Win', 'MetaLeft'], ['Alt', 'AltLeft'], [' ', 'Space', 4], ['Alt', 'AltRight'], ['←', 'ArrowLeft'],
      ['↓', 'ArrowDown'], ['→', 'ArrowRight'], ['Ctrl', 'ControlRight']];
    this.ukrainian = [['`', 'Backquote'], ['1', 'Digit1'], ['2', 'Digit2'], ['3', 'Digit3'], ['4', 'Digit4'], ['5', 'Digit5'],
      ['6', 'Digit6'], ['7', 'Digit7'], ['8', 'Digit8'], ['9', 'Digit9'], ['0', 'Digit0'], ['-', 'Minus'], ['=', 'Equal'],
      ['Backspace', 'Backspace', 3],
      ['Tab', 'Tab', 2], ['й', 'KeyQ'], ['ц', 'KeyW'], ['у', 'KeyE'], ['к', 'KeyR'], ['е', 'KeyT'], ['н', 'KeyY'], ['г', 'KeyU'],
      ['ш', 'KeyI'], ['щ', 'KeyO'], ['з', 'KeyP'], ['х', 'BracketLeft'], ['ї', 'BracketRight'], ['\\', 'Backslash'], ['Del', 'Delete'],
      ['CapsLock', 'CapsLock', 3], ['ф', 'KeyA'], ['і', 'KeyS'], ['в', 'KeyD'], ['а', 'KeyF'], ['п', 'KeyG'], ['р', 'KeyH'], ['о', 'KeyJ'],
      ['л', 'KeyK'], ['д', 'KeyL'], ['ж', 'Semicolon'], ['є', 'Quote'], ['Enter', 'Enter', 3],
      ['Shift', 'ShiftLeft', 3], ['я', 'KeyZ'], ['ч', 'KeyX'], ['с', 'KeyC'], ['м', 'KeyV'], ['и', 'KeyB'], ['т', 'KeyN'], ['ь', 'KeyM'],
      ['б', 'Comma'], ['ю', 'Period'], ['.', 'Slash'], ['↑', 'ArrowUp'], ['Shift', 'ShiftRight', 3],
      ['Ctrl', 'ControlLeft', 3], ['Win', 'MetaLeft'], ['Alt', 'AltLeft'], [' ', 'Space', 4], ['Alt', 'AltRight'], ['←', 'ArrowLeft'],
      ['↓', 'ArrowDown'], ['→', 'ArrowRight'], ['Ctrl', 'ControlRight']];
    this.currentLanguage = language;
    this.area = area;
    this.functionCodes = ['Backspace', 'Delete', 'CapsLock', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight',
      'ShiftLeft', 'ShiftRight'];
    this.pressed = new Set();
  }

  createKeys() {
    if (this.currentLanguage === 'ua') {
      this.keys = this.ukrainian.map((item) => new Key(...item).createKey());
    } else {
      this.keys = this.english.map((item) => new Key(...item).createKey());
    }
  }

  createKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    this.createKeys();
    this.keys.forEach((key) => {
      keyboard.append(key);
    });
    return keyboard;
  }

  onPress(event) {
    event.preventDefault();
    let key = null;
    if (event.type === 'mousedown') {
      key = event.target;
    } else {
      key = this.keys.find((element) => element.dataset.code === event.code);
    }
    if (key && key.classList.contains('key')) {
      this.pressed.add(key.dataset.code);
      if (this.functionCodes.includes(key.dataset.code)) {
        this.handleFunctionKey(key);
      } else {
        key.classList.add('pressed');
        this.insertKeyContent(key);
      }
    }
  }

  onUnpress(event) {
    let key = null;
    if (event.type === 'mouseup') {
      key = event.target;
    } else {
      key = this.keys.find((element) => element.dataset.code === event.code);
    }
    if (key && key.dataset.code !== 'CapsLock') {
      key.classList.remove('pressed');
      if (key.dataset.code === 'ShiftLeft' || key.dataset.code === 'ShiftRight') {
        this.unToggleShift();
      }
      if ((this.pressed.has('AltLeft') && this.pressed.has('ControlLeft') && this.pressed.size === 2)) {
        this.switchLanguage();
      }
      this.pressed.delete(key.dataset.code);
    }
  }

  onFocusLost() {
    this.keys.forEach((key) => {
      key.classList.remove('pressed');
    });
  }

  toggleCapsLock(key) {
    this.pressed.delete(key.dataset.code);
    key.classList.toggle('pressed');
    this.keys.forEach((item) => {
      const element = item;
      if (element.dataset.code.includes('Key')) {
        if (element.textContent === element.textContent.toLowerCase()) {
          element.textContent = element.textContent.toUpperCase();
        } else {
          element.textContent = element.textContent.toLowerCase();
        }
      }
    });
  }

  toggleShift(key) {
    this.pressed.delete(key.dataset.code);
    const shifts = this.keys.filter((item) => item.dataset.code === 'ShiftLeft' || item.dataset.code === 'ShiftRight');
    if (shifts.some((item) => item.classList.contains('pressed'))) {
      return null;
    }
    key.classList.add('pressed');
    this.keys.forEach((item) => {
      const element = item;
      if (element.dataset.code.includes('Key')) {
        if (element.textContent === element.textContent.toLowerCase()) {
          element.textContent = element.textContent.toUpperCase();
        } else {
          element.textContent = element.textContent.toLowerCase();
        }
      } else {
        switch (element.dataset.code) {
          case 'Backquote':
            element.textContent = '~';
            break;
          case 'Digit1':
            element.textContent = '!';
            break;
          case 'Digit2':
            element.textContent = '@';
            break;
          case 'Digit3':
            element.textContent = '#';
            break;
          case 'Digit4':
            element.textContent = '$';
            break;
          case 'Digit5':
            element.textContent = '%';
            break;
          case 'Digit6':
            element.textContent = '^';
            break;
          case 'Digit7':
            element.textContent = '&';
            break;
          case 'Digit8':
            element.textContent = '*';
            break;
          case 'Digit9':
            element.textContent = '(';
            break;
          case 'Digit0':
            element.textContent = ')';
            break;
          case 'Minus':
            element.textContent = '_';
            break;
          case 'Equal':
            element.textContent = '+';
            break;
          case 'BracketLeft':
            element.textContent = '{';
            break;
          case 'BracketRight':
            element.textContent = '}';
            break;
          case 'Backslash':
            element.textContent = '|';
            break;
          case 'Semicolon':
            element.textContent = ':';
            break;
          case 'Quote':
            element.textContent = '"';
            break;
          case 'Comma':
            element.textContent = '<';
            break;
          case 'Period':
            element.textContent = '>';
            break;
          case 'Slash':
            element.textContent = '?';
            break;
          default:
            break;
        }
      }
    });
    this.shiftToggled = true;
    return null;
  }

  unToggleShift() {
    const shifts = this.keys.filter((item) => item.dataset.code === 'ShiftLeft' || item.dataset.code === 'ShiftRight');
    if (shifts.some((item) => item.classList.contains('pressed'))) {
      return null;
    }
    this.keys.forEach((item) => {
      const element = item;
      if (element.dataset.code.includes('Key')) {
        if (element.textContent === element.textContent.toLowerCase()) {
          element.textContent = element.textContent.toUpperCase();
        } else {
          element.textContent = element.textContent.toLowerCase();
        }
      } else {
        element.textContent = element.dataset.initialValue;
      }
    });
    this.shiftToggled = false;
    return null;
  }

  insertKeyContent(key) {
    const position = this.area.selectionStart;
    if (key.dataset.code === 'Enter') {
      this.area.value = `${this.area.value.slice(0, position)}\n${
        this.area.value.slice(position, this.area.value.length)}`;
    } else if (key.dataset.code === 'Tab') {
      this.area.value = `${this.area.value.slice(0, position)}\t${
        this.area.value.slice(position, this.area.value.length)}`;
    } else {
      this.area.value = this.area.value.slice(0, position) + key.textContent
     + this.area.value.slice(position, this.area.value.length);
    }
    this.area.setSelectionRange(position + 1, position + 1);
  }

  handleFunctionKey(key) {
    switch (key.dataset.code) {
      case 'CapsLock':
        this.toggleCapsLock(key);
        break;
      case 'ShiftLeft':
      case 'ShiftRight': {
        this.toggleShift(key);
        break;
      }
      case 'Backspace':
        key.classList.add('pressed');
        this.handleBackspace(this.area.selectionStart);
        break;
      case 'Delete':
        key.classList.add('pressed');
        this.handleDel(this.area.selectionStart);
        break;
      default:
        key.classList.add('pressed');
    }
  }

  handleBackspace(position) {
    if (position > 0) {
      this.area.value = this.area.value.slice(0, position - 1)
      + this.area.value.slice(position, this.area.value.length);
      this.area.setSelectionRange(position - 1, position - 1);
    }
  }

  handleDel(position) {
    this.area.value = this.area.value.slice(0, position)
    + this.area.value.slice(position + 1, this.area.value.length);
    this.area.setSelectionRange(position, position);
  }

  switchLanguage() {
    let source = [];
    if (this.currentLanguage === 'en') {
      source = this.ukrainian;
      this.currentLanguage = 'ua';
    } else {
      source = this.english;
      this.currentLanguage = 'en';
    }
    localStorage.setItem('language', this.currentLanguage);
    let shift = null;
    let caps = null;
    this.keys.forEach(((item, index) => {
      const oldKey = item;
      const newKey = new Key(...source[index]).createKey();
      if ((oldKey.dataset.code === 'ShiftLeft' || oldKey.dataset.code === 'ShiftRight') && oldKey.classList.contains('pressed')) {
        shift = newKey;
      }
      if (oldKey.dataset.code === 'CapsLock' && oldKey.classList.contains('pressed')) {
        caps = newKey;
      }
      this.keys[this.keys.indexOf(oldKey)] = newKey;
      oldKey.parentNode.replaceChild(newKey, oldKey);
    }));

    if (shift) {
      this.toggleShift(shift);
    }
    if (caps) {
      this.toggleCapsLock(caps);
    }
  }
}
