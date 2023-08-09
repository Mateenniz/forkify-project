import icons from 'url:../../img/icons.svg';
// import previewView from './previewView.js';
export default class View {
  _data;
  /**
   * Render the received object to the dom
   * @param {Object | object[]} data the data to be rendered for (e.g recipe)
   * @returns {undefined | string} this function usually nothing sometimes string
   * @this {Object} View instance
   * @author Abdul Mateen
   * @todo Finish implementation
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    // if (!render) return markup;
    this._clear();

    this._renderHTML(markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  renderSpinner() {
    const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `;
    this._clear();
    this._renderHTML(markup);
  }
  renderError(message = this._errorMesage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._renderHTML(markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `;
    this._clear();
    this._renderHTML(markup);
  }
  _renderHTML(markup) {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
