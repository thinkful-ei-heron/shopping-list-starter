const BASE_URL = 'https://thinkful-list-api.herokuapp.com/andrea';

const getItems = function () {
  return fetch(`${BASE_URL}/items`);
}

const createItem = function (name) {
  const newItem = JSON.stringify({ name });
  return fetch(BASE_URL + '/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });
};

const updateItem = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(BASE_URL + '/items/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};

export default {
  getItems,
  createItem,
  updateItem
};