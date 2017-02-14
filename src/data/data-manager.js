import FS from 'fs';
import path from 'path';

const getAll = (filename, delay = 0) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      FS.readFile(filename, 'utf-8', (err, content) => (!err ? resolve(JSON.parse(content)) : reject(err)));
    }, delay);
  })
);

const save = (filename, data, delay = 0) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      FS.writeFile(filename, JSON.stringify(data), (err) => (!err ? resolve(data) : reject(err)));
    }, delay);
  })
);

const post = (filename, data, delay = 0) => {
  console.log('Posting: ', data, ' in ', filename);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getAll(filename)
        .then((res) => save(filename, [...res, data]))
        .then((res) => { // eslint-disable-line no-unused-vars
          resolve(data);
          console.log('Posted!');
        })
        .catch((err) => {
          reject(err);
          console.log('Post error - ', err);
        });
    }, delay);
  });
};

const update = (filename, data, index, delay = 0) => {
  console.log('Updating: ', data, ' in ', filename);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getAll(filename)
        .then((res) => save(filename, [...res.slice(0, index), data, ...res.slice(index + 1)]))
        .then((res) => { // eslint-disable-line no-unused-vars
          resolve(data);
          console.log('Updated!');
        })
        .catch((err) => {
          reject(err);
          console.log('Update error - ', err);
        });
    }, delay);
  });
};

const remove = (filename, index, delay = 0) => {
  console.log('Deleting element: ', index, ' in ', filename);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getAll(filename)
        .then((res) => save(filename, [...res.slice(0, index), ...res.slice(index + 1)]))
        .then((res) => { // eslint-disable-line no-unused-vars
          resolve({ id: index });
          console.log('Deleted!');
        })
        .catch((err) => {
          reject(err);
          console.log('Delete error - ', err);
        });
    }, delay);
  });
};

const filename = path.join(__dirname, 'todos.json');
const delayme = 0;

export { getAll, save, post, update, remove, filename, delayme };
