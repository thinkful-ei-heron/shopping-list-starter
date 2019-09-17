import $ from 'jquery';

import 'normalize.css';
import './index.css';

import shoppingList from './shopping-list';

function main() {
  shoppingList.bindEventListeners();
  shoppingList.render();
}

$(main);
