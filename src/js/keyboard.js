import Key from './key';

export default class Keyboard {
  constructor() {
    this.characters = [['`', 'Backquote'], ['1', 'Digit1'], ['2', 'Digit2'], ['3', 'Digit3'], ['4', 'Digit4'], ['5', 'Digit5'],
      ['6', 'Digit6'], ['7', 'Digit7'], ['8', 'Digit8'], ['9', 'Digit9'], ['0', 'Digit0'], ['-', 'Minus'], ['=', 'Equal'],
      ['Backspace', 'Backspace', 3],
      ['Tab', 'Tab', 2], ['q', 'KeyQ'], ['w', 'KeyW'], ['e', 'KeyE'], ['r', 'KeyR'], ['t', 'KeyT'], ['y', 'KeyY'], ['u', 'KeyU'],
      ['i', 'KeyI'], ['o', 'KeyO'], ['p', 'KeyP'], ['[', 'BracketLeft'], [']', 'BracketRight'], ['\\', 'Backslash'], ['Del', 'Delete'],
      ['CapsLock', 'CapsLock', 3], ['a', 'KeyA'], ['s', 'KeyS'], ['d', 'KeyD'], ['f', 'KeyF'], ['g', 'KeyG'], ['h', 'KeyH'], ['j', 'KeyJ'],
      ['k', 'KeyK'], ['l', 'KeyL'], [';', 'Semicolon'], ['\'', 'Quote'], ['Enter', 'Enter', 3],
      ['Shift', 'ShiftLeft', 3], ['z', 'KeyZ'], ['x', 'KeyX'], ['c', 'KeyC'], ['v', 'KeyV'], ['b', 'KeyB'], ['n', 'KeyN'], ['m', 'KeyM'],
      [',', 'Comma'], ['.', 'Period'], ['/', 'Slash'], ['↑', 'ArrowUp'], ['Shift', 'ShiftRight', 3],
      ['Ctrl', 'ControlLeft', 3], ['Win', 'MetaLeft'], ['Alt', 'AltLeft'], ['', 'Space', 4], ['Alt', 'AltRight'], ['←', 'ArrowLeft'],
      ['↓', 'ArrowDown'], ['→', 'ArrowRight'], ['Ctrl', 'ControlRight']];
    this.keys = this.characters.map((char) => new Key(...char).createKey());
  }

  createKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    this.keys.forEach((key) => {
      keyboard.append(key);
    });

    return keyboard;
  }

  onKeydown(event) {
    event.preventDefault();
    const key = this.keys.find((element) => element.dataset.code === event.code);
    if (key) {
      switch (key.dataset.code) {
        case 'CapsLock':
          this.toggleCapsLock(key);
          break;
        case 'ShiftLeft':
        case 'ShiftRight': {
          this.toggleShift(key);
          break;
        }
        default:
          key.classList.add('pressed');
      }
    }
  }

  onKeyup(event) {
    const key = this.keys.find((element) => element.dataset.code === event.code);
    if (key && key.dataset.code !== 'CapsLock') {
      key.classList.remove('pressed');
      if (key.dataset.code === 'ShiftLeft' || key.dataset.code === 'ShiftRight') {
        this.unToggleShift();
      }
    }
  }

  onFocusLost() {
    this.keys.forEach((key) => {
      key.classList.remove('pressed');
    });
  }

  toggleCapsLock(key) {
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
    if (this.shiftToggled) return null;
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
          case 'SemiColon':
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
  }
}
