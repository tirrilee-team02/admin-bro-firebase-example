const { FireStore } = require('../FirebaseConfig');
const uploadFeature = require('@admin-bro/upload');

module.exports = {
  collection: FireStore.collection('Profiles'),
  schema: {
    name: 'string',
    nickname: 'string',
    age: 'string',
    image: {
      type: 'mixed',
    },
    createdAt: 'datetime',
    updatedAt: 'datetime',
  },
  options: {
    properties: {
      createdAt: {
        isVisible: { list: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: true, show: true, edit: false },
      },
    },
  },
  features: [
    uploadFeature({
      properties: {
        file: 'image.file',
        filePath: 'image.path',
        filename: 'image.filename',
        filesToDelete: 'image.toDelete',
        key: 'image.key',
        mimeType: 'image.mimeType',
        bucket: 'image.bucket',
      },
      provider: {
        gcp: {
          bucket: process.env.FIREBASE_STORAGE_BUCKET,
          expires: 0,
        },
      },
    }),
  ],
};
