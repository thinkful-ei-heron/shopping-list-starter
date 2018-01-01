/* global store, cuid */
// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form id="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
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
    let items = store.items;
    if (store.hideCheckedItems) {
      items = store.items.filter(item => !item.checked);
    }
  
    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = store.items.filter(item => item.name.includes(store.searchTerm));
    }
  
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  
  function addItemToShoppingList(itemName) {
    store.items.push({ id: cuid(), name: itemName, checked: false });
  }
  
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      console.log('`handleNewItemSubmit` ran');
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      addItemToShoppingList(newItemName);
      render();
    });
  }
  
  function toggleCheckedForListItem(id) {
    const foundItem = store.items.find(item => item.id === id);
    foundItem.checked = !foundItem.checked;
  }
  
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function getItemNameFromElement(item) {
    const itemName = $(item)
      .find('.shopping-item')
      .val();
    return itemName;
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const itemIndex = getItemIdFromElement(event.currentTarget);
      toggleCheckedForListItem(itemIndex);
      render();
    });
  }
  
  function deleteListItem(id) {
    const index = store.items.find(item => item.id === id);
    store.items.splice(index, 1);
  }
  
  function editListItemName(id, itemName) {
    const item = store.items.find(item => item.id === id);
    item.name = itemName;
  }
  
  function toggleCheckedItemsFilter() {
    store.hideCheckedItems = !store.hideCheckedItems;
  }
  
  function setSearchTerm(val) {
    store.searchTerm = val;
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      deleteListItem(id);
      // render the updated shopping list
      render();
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '#js-edit-item', event => {
      event.preventDefault();
      console.log(event.currentTarget);
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = getItemNameFromElement(event.currentTarget);
      editListItemName(id, itemName);
      render();
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      toggleCheckedItemsFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      setSearchTerm(val);
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

  // The object we return is the ONLY publically available attributes/methods:
  return {
    render,
    bindEventListeners
  };
}());
