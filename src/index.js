import $ from 'jquery';

import 'normalize.css';
import './index.css';

import shoppingList from './shopping-list.js';
import store from './store.js';
import api from './api.js';

function main() {
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      shoppingList.render();
    });
  shoppingList.bindEventListeners();
  shoppingList.render();
}

$(main);
