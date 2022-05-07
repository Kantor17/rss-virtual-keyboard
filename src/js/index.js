import '../style.css';
import Keyboard from './keyboard';

const keyboard = new Keyboard();

const keyboardE = keyboard.createKeyboard();
document.body.append(keyboardE);

document.body.addEventListener('keydown', (event) => {
  keyboard.onPress(event);
});
document.body.addEventListener('keyup', (event) => {
  keyboard.onUnpress(event);
});

keyboardE.addEventListener('mousedown', (event) => {
  keyboard.onPress(event);
});
keyboardE.addEventListener('mouseup', (event) => {
  keyboard.onUnpress(event);
});

window.addEventListener('blur', () => {
  keyboard.onFocusLost();
});
