class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer() {
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
