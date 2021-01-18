const AdminBro = require('admin-bro');
const { FireStore } = require('../FirebaseConfig');

module.exports = {
  collection: FireStore.collection('User'),
  schema: {
    email: 'string',
    name: 'string',
    nickname: 'nickname',
  },
  options: {
    properties: {
      contents: {
        components: {
          edit: AdminBro.bundle('../components/TextEditor'),
        },
      },
    },
  },
};
