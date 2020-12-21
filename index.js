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
      collection: FireStore.collection('Profiles'),
      schema: {
        name: 'richtext',
        // images: {
        //   type: 'mixed',
        //   schema: {
        //     key: 'string',
        //     bucket: 'string',
        //     mimeType: 'string',
        //     filename: 'string',
        //   }
        // }
      },
      options: {
        properties: {
          name: {
            components: {
              edit: AdminBro.bundle('./components/TextEditor'),
            },
          },
        },
      },
      // features: [uploadFeature({
      //   properties: {
      //     file: 'images.file',
      //     filePath: 'images.path',
      //     filename: 'images.filename',
      //     filesToDelete: 'images.toDelete',
      //     key: 'images.key',
      //     mimeType: 'images.mimeType',
      //     bucket: 'images.bucket',
      //   },
      //   provider: {
      //     gcp: {
      //       bucket: process.env.FIREBASE_STORAGE_BUCKET,
      //       expires: 0,
      //     },
      //   },
      // })],
    }
  ],
})

const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(process.env.PORT || 3000, () => console.log('AdminBro is under localhost:8080/admin'))
