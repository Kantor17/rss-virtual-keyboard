export default class Key {
  constructor(value, length) {
    this.value = value;
    this.length = length;
  }

  createKey() {
    const key = document.createElement('button');
    key.textContent = this.value;
    key.classList.add('key');
    if (this.length > 1) {
      key.classList.add(`length${this.length}`);
    }
    return key;
  }
}
