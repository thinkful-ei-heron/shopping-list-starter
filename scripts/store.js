import item from './item.js';

const store = {
  items: [],
  hideCheckeditems: false,

  findById: function (id) {
    return this.items.find(currentItem => currentItem.id === id);
  },
  
  
  addItem: function (name) {
    try {
      item.validateName(name);
      this.items.push(item.create(name));
    } catch (e) {
      console.log(e.message);
    }
  },
  
  findAndToggleChecked: function (id) {
    const currentItem = this.findById(id);
    currentItem.checked = !currentItem.checked;
  },
  
  findAndUpdateName: function (id, name) {
    try {
      item.validateName(name);
      const currentItem = this.findById(id);
      currentItem.name = name;
    } catch (e) {
      console.log('Cannot update name: ' + e.message);
    }
  },
  
  findAndUpdateName: function (id, name) {
    try {
      item.validateName(name);
      const currentItem = this.findById(id);
      currentItem.name = name;
    } catch (e) {
      console.log('Cannot update name: ' + e.message);
    }
  },
  
  findAndDelete: function (id) {
    this.items = this.items.filter(currentItem => currentItem.id !== id);
  },
  
  toggleCheckedFilter: function () {
    this.hideCheckedItems = !this.hideCheckedItems;
  }  
};

export default store;
