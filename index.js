const AdminBro = require('admin-bro')
const AdminBroFirebase = require('admin-bro-firebase')
const AdminBroExpress = require('@admin-bro/express')
const firebase = require("firebase/app");

const express = require('express')
const app = express()

// 파이어베이스 웹 플랫폼 추가하면 나옴
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://myside-7a4b6.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
        name: 'string',
      },
    },
  ],
})

const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))
