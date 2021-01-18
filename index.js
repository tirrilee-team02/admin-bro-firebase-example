const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env-local') });

// const Profile = require('./resources/Profile');
const User = require('./resources/User');

const Locale = require('./locale');

const AdminBro = require('admin-bro');
const AdminBroFirebase = require('@tirrilee/admin-bro-firebase');
const AdminBroExpress = require('@admin-bro/express');

const express = require('express');
const app = express();

AdminBro.registerAdapter(AdminBroFirebase.FirestoreAdapter);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [User],
  locale: Locale,
});

const router =
  process.env.LOGIN_REQUIRED === 'true'
    ? AdminBroExpress.buildAuthenticatedRouter(adminBro, {
        authenticate: async (email, password) => {
          if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
          ) {
            return true;
          }
          return false;
        },
        cookiePassword: 'some-secret-password-used-to-secure-cookie',
      })
    : AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);
app.listen(process.env.PORT || 3000, () =>
  console.log(`AdminBro is under localhost:${process.env.PORT || 3000}/admin`),
);
