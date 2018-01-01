/* global store */
// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item, itemIndex) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form id="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
        </form>
      `;
    }
  
    return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
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
    console.log('Generating shopping list element');
  
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
    return items.join('');
  }
  
  
  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;
    if (store.toggleCheckedFilter) {
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
    console.log(`Adding "${itemName}" to shopping list`);
    store.items.push({ name: itemName, checked: false });
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
  
  function toggleCheckedForListItem(itemIndex) {
    console.log('Toggling checked property for item at index ' + itemIndex);
    store.items[itemIndex].checked = !store.items[itemIndex].checked;
  }
  
  
  function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
      .closest('.js-item-index-element')
      .attr('data-item-index');
    return parseInt(itemIndexString, 10);
  }
  
  function getItemNameFromElement(item) {
    const itemName = $(item)
      .find('.shopping-item')
      .val();
    return itemName;
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      console.log('`handleItemCheckClicked` ran');
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      toggleCheckedForListItem(itemIndex);
      render();
    });
  }
  
  // name says it all. responsible for deleting a list item.
  function deleteListItem(itemIndex) {
    console.log(`Deleting item at index  ${itemIndex} from shopping list`);
  
    // as with `addItemToShoppingLIst`, this function also has the side effect of
    // mutating the global store value.
    //
    // we call `.splice` at the index of the list item we want to remove, with a length
    // of 1. this has the effect of removing the desired item, and shifting all of the
    // elements to the right of `itemIndex` (if any) over one place to the left, so we
    // don't have an empty space in our list.
    store.items.splice(itemIndex, 1);
  }
  
  function editListItemName(itemIndex, itemName) {
    store.items[itemIndex].name = itemName;
  }
  
  function toggleCheckedFilter() {
    store.toggleCheckedFilter = !store.toggleCheckedFilter;
  }
  
  function setSearchTerm(val) {
    store.searchTerm = val;
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      // delete the item
      deleteListItem(itemIndex);
      // render the updated shopping list
      render();
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '#js-edit-item', event => {
      event.preventDefault();
      console.log(event.currentTarget);
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      const itemName = getItemNameFromElement(event.currentTarget);
      editListItemName(itemIndex, itemName);
      render();
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      toggleCheckedFilter();
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
