import $ from 'jquery';

import 'normalize.css';
import './index.css';

import shoppingList from './shopping-list.js';
// import store from './store.js';
// import item from './item.js';

function main() {
  shoppingList.bindEventListeners();
  shoppingList.render();
}

$(main);
