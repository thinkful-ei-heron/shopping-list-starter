const items = [];
let error = null;
let hideCheckeditems = false;

const findById = function (id) {
  return this.items.find(item => item.id === id);
};

const addItem = function (item) {
  this.items.push(item);
};

const findAndDelete = function (id) {
  this.items = this.items.filter(item => item.id !== id);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

const findAndUpdate = function (id, newData) {
  const item = this.findById(id);
  Object.assign(item, newData);
};

const setError = function (error) {
  this.error = error;
};

export default {
  items,
  error,
  hideCheckeditems,
  findById,
  addItem,
  findAndDelete,
  toggleCheckedFilter,
  findAndUpdate,
  setError
};
