import '../style.css';
import Keyboard from './keyboard';

const textArea = document.createElement('textarea');
textArea.rows = 12;
textArea.cols = 50;
textArea.classList.add('textArea');
textArea.autofocus = true;
const keyboard = new Keyboard(textArea);
const keyboardE = keyboard.createKeyboard();
document.body.append(textArea, keyboardE);

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
