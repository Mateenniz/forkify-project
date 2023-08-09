import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMesage = 'No recipes found for your query! please Try Again :(';
  _message = '';
  _generateMarkup() {
    return this._data.map(previewView.generateMarkupPreview).join('');
  }
}
export default new ResultsView();
