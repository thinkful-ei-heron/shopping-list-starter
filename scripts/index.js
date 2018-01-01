// eslint-disable-next-line no-unused-vars
const store = {
  items: [
    { name: 'apples', checked: false },
    { name: 'oranges', checked: false },
    { name: 'milk', checked: true },
    { name: 'bread', checked: false }
  ],
  toggleCheckedFilter: false,
  searchTerm: ''
};

/* global shoppingList */
$(document).ready(function() {
  shoppingList.bindEventListeners();
  shoppingList.render();
});
