import shoppingList from './shopping-list.js';

function main() {
  shoppingList.bindEventListeners();
  shoppingList.render();
}

$(main);