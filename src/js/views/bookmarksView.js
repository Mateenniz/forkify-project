import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMesage = 'No bookmarks yet! find a nice recipe and bookmark it :)';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(previewView.generateMarkupPreview).join('');
  }
}
export default new BookmarksView();
