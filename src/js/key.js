export default class Key {
  constructor(value, code, length) {
    this.value = value;
    this.code = code;
    this.length = length;
  }

  createKey() {
    const key = document.createElement('button');
    key.textContent = this.value;
    key.classList.add('key');
    key.dataset.code = this.code;
    if (this.length > 1) {
      key.classList.add(`length${this.length}`);
    }

    return key;
  }
}
