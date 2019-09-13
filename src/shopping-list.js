import $ from 'jquery';

import store from './store';
import item from './item';
import api from './api';

function generateItemElement(item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }

  return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join('');
}

function render() {
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }

  // Filter item list if store prop `searchTerm` is not empty
  if (store.searchTerm) {
    items = items.filter(item => item.name.includes(store.searchTerm));
  }

  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  try {
    item.validateName(itemName);
    store.items.push(item.create(itemName));
    render();
  } catch (error) {
    console.log(`Cannot add item: ${error.message}`);
  }
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    api.createItem(newItemName)
      .then((newItem) => {
        store.addItem(newItem);
        render();
      })
      .catch((err) => {
        store.setError(err.message);
        renderError();
      });
  });
}

function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.findAndToggleChecked(id);
    render();
  });
}

function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in store.items
    const id = getItemIdFromElement(event.currentTarget);
    // delete the item
    store.findAndDelete(id);
    // render the updated shopping list
    render();
  });
}

function handleEditShoppingItemSubmit() {
  $('.js-shopping-list').on('submit', '.js-edit-item', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.shopping-item').val();
    api.updateItem(id, { name: itemName })
      .then(() => {
        store.findAndUpdate(id, { name: itemName });
        store.setItemIsEditing(id, false);
        render();
      })
      .catch((err) => {
        console.log(err);
        store.setError(err.message);
        // renderError();
      });
  });
}

function handleToggleFilterClick() {
  $('.js-filter-checked').click(() => {
    store.toggleCheckedFilter();
    render();
  });
}

function handleShoppingListSearch() {
  $('.js-shopping-list-search-entry').on('keyup', event => {
    const val = $(event.currentTarget).val();
    store.setSearchTerm(val);
    render();
  });
}

function bindEventListeners() {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditShoppingItemSubmit();
  handleToggleFilterClick();
  handleShoppingListSearch();
}

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners
};