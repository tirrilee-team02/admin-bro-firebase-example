const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env-local') })

const {FireStore} = require('./FirebaseConfig')

const AdminBro = require('admin-bro')
const AdminBroFirebase = require('@tirrilee/admin-bro-firebase')
const AdminBroExpress = require('@admin-bro/express')
const uploadFeature = require('@admin-bro/upload')

const express = require('express')
const app = express()

AdminBro.registerAdapter(AdminBroFirebase.FirestoreAdapter);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
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
              edit: AdminBro.bundle('./components/TextEditor'),
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
    },
    {
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
        }
      },
      features: [uploadFeature({
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
      })],
    }
  ],
})

const router = process.env.LOGIN_REQUIRED === 'true' ? AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return true
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
}) : AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(process.env.PORT || 3000, () => console.log('AdminBro is under localhost:8080/admin'))
