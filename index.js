const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env-local') })

const AdminBro = require('admin-bro')
const AdminBroFirebase = require('@tirrilee/admin-bro-firebase')
const AdminBroExpress = require('@admin-bro/express')
const firebase = require("firebase/app");

const express = require('express')
const app = express()

// 파이어베이스 웹 플랫폼 추가하면 나옴
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

AdminBro.registerAdapter(AdminBroFirebase.FirestoreAdapter);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      collection: firebase.firestore().collection('Profiles'),
      schema: {
        name: 'richtext',
      },
      options: {
        properties: {
          name: {
            components: {
              edit: AdminBro.bundle('./CustomEditor'),
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
