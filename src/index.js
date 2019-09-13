import $ from 'jquery';

import 'normalize.css';
import './index.css';

import shoppingList from './shopping-list.js';
import store from './store.js';
import item from './item.js';
import api from './api.js';

function main() {

  api.getItems()
    .then(res => console.log(res));

  console.log(api.BASE_URL);


  shoppingList.bindEventListeners();
  shoppingList.render();
}

$(main);
