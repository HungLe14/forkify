import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)'
  _windowElement = document.querySelector('.add-recipe-window');
  _ovelayElement = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._ovelayElement.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._ovelayElement.addEventListener('click', this.toggleWindow.bind(this));
    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape') {
          this.toggleWindow();
        }
      }.bind(this)
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Getting data from form in HTML
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _genarateMarkup() {}
}

export default new AddRecipeView();
