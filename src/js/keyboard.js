import Key from './key';

const characters = [['`'], ['1'], ['3'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['0'], ['-'], ['='], ['Backspace', 3],
  ['Tab', 2], ['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], ['['], [']'], ['\\'], ['Del'],
  ['CapsLock', 3], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';'], ['\''], ['Enter', 3],
  ['Shift', 3], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [','], ['.'], ['/'], ['↑'], ['Shift', 3],
  ['Ctrl', 3], ['Win'], ['Alt'], ['', 4], ['Alt'], ['←'], ['↓'], ['→'], ['Ctrl']];

export default class Keyboard {
  constructor() {
    this.keys = characters.map((char) => new Key(char[0], char[1]).createKey());
  }

  createKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    this.keys.forEach((key) => {
      keyboard.append(key);
    });

    return keyboard;
  }
}
