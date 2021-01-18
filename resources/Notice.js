const AdminBro = require('admin-bro');
const { FireStore } = require('../FirebaseConfig');

module.exports = {
  collection: FireStore.collection('Notice'),
  schema: {
    order: 'number',
    title: 'string',
    contents: 'richtext',
    createdAt: 'datetime',
    updatedAt: 'datetime',
  },
  options: {
    properties: {
      contents: {
        components: {
          edit: AdminBro.bundle('../components/TextEditor'),
        },
      },
      createdAt: {
        isVisible: { list: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: true, show: true, edit: false },
      },
    },
  },
};
