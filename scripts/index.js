import shoppingList from './shopping-list.js';
import store from './store.js';
import item from './item.js';

function main() {
  shoppingList.bindEventListeners();
  shoppingList.render();
}

$(main);
