const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');

const { User } = require('../db/models/user');
const { List } = require('../db/models/list');
const { Item } = require('../db/models/item');


AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [
    {
      resource: User,
      options: {
        properties: { password: { isVisible: false } },
        // parent: { name: 'User-Related' }
      }
    },
    {
        resource: List,
    },
    {
        resource: Item,
    }

  ],
  rootPath: '/admin',
  branding: {
    companyName: 'listy',
    softwareBrothers: false
  }
});

const Admin = {
  email: process.env.ADMIN_BRO_EMAIL,
  password: process.env.ADMIN_BRO_PASSWORD
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: 'admin-bro',
  cookiePassword: 'supersecret',
  authenticate: (email, password) => {
    if (email === Admin.email && password === Admin.password) {
      return Admin;
    }
    return null;
  }
});

module.exports = router;