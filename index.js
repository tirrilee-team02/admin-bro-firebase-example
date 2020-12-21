const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env-local') })

const {FireStore} = require('./FirebaseConfig')

const AdminBro = require('admin-bro')
const AdminBroFirebase = require('@tirrilee/admin-bro-firebase')
const AdminBroExpress = require('@admin-bro/express')

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
    }
  ],
})

const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))
