import item from './item.js';

const items = [];
let hideCheckeditems = false;
let searchTerm = '';

const findById = function (id) {
  return this.items.find(item => item.id === id);
};

const addItem = function (name) {
  try {
    item.validateName(name);
    this.items.push(item.create(name));
  } catch (e) {
    console.log(e.message);
  }
};

const findAndToggleChecked = function (id) {
  const item = this.findById(id);
  item.checked = !item.checked;
};

const findAndUpdateName = function (id, name) {
  try {
    item.validateName(name);
    const item = this.findById(id);
    item.name = name;
  } catch (e) {
    console.log('Cannot update name: ' + e.message);
  }
};

const findAndDelete = function (id) {
  this.items = this.items.filter(item => item.id !== id);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

const setSearchTerm = function (term) {
  this.searchTerm = term;
};

export default {
  items,
  hideCheckeditems,
  searchTerm,
  findById,
  addItem,
  findAndToggleChecked,
  findAndUpdateName,
  findAndDelete,
  toggleCheckedFilter,
  setSearchTerm
};
