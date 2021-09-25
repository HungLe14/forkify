import icons from 'url:../../img/icons.svg';
import View from './view.js';
import PreviewView from './PreviewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again!';
  _message = '';

  _genarateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultView();
