import Key from './key';

const characters = [['`', 'Backquote'], ['1', 'Digit1'], ['2', 'Digit2'], ['3', 'Digit3'], ['4', 'Digit4'], ['5', 'Digit5'],
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

export default class Keyboard {
  constructor() {
    this.keys = characters.map((char) => new Key(...char).createKey());
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
      key.classList.add('pressed');
    }
  }

  onKeyup(event) {
    const key = this.keys.find((element) => element.dataset.code === event.code);
    if (key) {
      key.classList.remove('pressed');
    }
  }

  onFocusLost() {
    this.keys.forEach((key) => {
      key.classList.remove('pressed');
    });
  }
}
