import '../style.css';
import Keyboard from './keyboard';

const textArea = document.createElement('textarea');
textArea.rows = 12;
textArea.cols = 50;
textArea.classList.add('textArea');
textArea.autofocus = true;

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
}
const keyboard = new Keyboard(textArea, localStorage.getItem('language'));
const keyboardE = keyboard.createKeyboard();
document.body.append(textArea, keyboardE);

const instruction = document.createElement('div');
instruction.classList.add('instruction');
const systemInstruction = document.createElement('p');
systemInstruction.textContent = 'Клавиатура создана в операционной системе Windows';
const languageInstruction = document.createElement('p');
languageInstruction.textContent = 'Нажмите левые Ctrl и Alt для переключения языка';
instruction.append(systemInstruction, languageInstruction);
document.body.append(instruction);

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
