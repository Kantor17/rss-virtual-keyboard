import '../style.css';
import Keyboard from './keyboard';

const keyboard = new Keyboard();

const keyboardE = keyboard.createKeyboard();
document.body.append(keyboardE);

document.body.addEventListener('keydown', (event) => {
  keyboard.onKeydown(event);
});
document.body.addEventListener('keyup', (event) => {
  keyboard.onKeyup(event);
});

keyboardE.addEventListener('mousedown', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('key')) {
    event.target.classList.add('pressed');
  }
});
keyboardE.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('key')) {
    event.target.classList.remove('pressed');
  }
});

window.addEventListener('blur', () => {
  keyboard.onFocusLost();
});
