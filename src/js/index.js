import '../style.css';
import Keyboard from './keyboard';

const keyboard = new Keyboard().createKeyboard();

document.body.append(keyboard);
