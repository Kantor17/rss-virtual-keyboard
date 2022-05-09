export default class Key {
  constructor(value, code, addition, length) {
    this.value = value;
    this.code = code;
    this.addition = addition;
    this.length = length;
  }

  createKey() {
    const key = document.createElement('button');
    key.textContent = this.value;
    key.classList.add('key');
    key.dataset.code = this.code;
    key.dataset.initialValue = this.value;
    key.dataset.addition = this.addition;
    if (this.length > 1) {
      key.classList.add(`length${this.length}`);
    }

    return key;
  }
}
