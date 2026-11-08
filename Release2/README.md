**RELEASE 2**

**Author: Nathan Dolan**

**Student No: 20059337**

CoffeePlacemark is a web application that allows users to create, manage, and explore coffee shop placemarks.
Release 2 introduces the full Placemark Core, including persistent JSON storage, placemark creation, listing, deletion, and improved account administration.

This release builds directly on the foundation established in Release 1 (Accounts + Dashboard).

**Features Included in Release 2**
**Placemark Core**

• Add new placemarks (name, description, location)

• List placemarks belonging to the logged‑in user

• Delete placemarks

• Persistent JSON storage for placemarks

• User → placemark relationship maintained in JSON

**Accounts:**

• User settings page (edit profile + change password)

• Admin user list

• Admin delete user

• All user data stored persistently in JSON

**JSON Stores**

• user-json-store.js

• placemark-json-store.js

• Shared JSON database file (db.json)

• LowDB‑based read/write operations

• Fully replaces Release 1 mem stores

**Navigation**

• welcome-menu.hbs for unauthenticated users

• menu.hbs for authenticated users

• Active menu highlighting

**UI & Views**

• Placemark view (add + list + delete)

• Settings view

• Admin users view

• Dashboard view


**Folder Structure (Release 2):**

coffee-placemark/
│
├── src/
│   ├── controllers/
│   │   ├── accounts-controller.js
│   │   ├── dashboard-controller.js
│   │   └── placemark-controller.js
│   │
│   ├── models/
│   │   └── json/
│   │       ├── lowdb.js
│   │       ├── user-json-store.js
│   │       ├── placemark-json-store.js
│   │       └── db.json
│   │
│   ├── routes/
│   │   └── web-routes.js
│   │
│   └── views/
│       ├── placemark-view.hbs
│       ├── settings-view.hbs
│       ├── admin-users-view.hbs
│       ├── dashboard-view.hbs
│       ├── login-view.hbs
│       ├── signup-view.hbs
│       ├── about-view.hbs
│       ├── partials/
│       │   ├── menu.hbs
│       │   └── welcome-menu.hbs
│       └── layouts/
│
├── server.js
└── README.md

**Authentication Flow (unchanged from Release 1)**

• User signs up → stored in JSON

• User logs in → bcrypt password validation

• Cookie session created

• Protected routes require valid session

• Dashboard + placemarks + settings + admin pages require authentication

**Testing Status (Release 2)**

Manual testing completed:

**Accounts**

• Signup + validation

• Login + validation

• Settings update

• Password hashing

• Admin user list

• Admin delete user

**Placemarks**

• Add placemark

• Validation errors

• List placemarks

• Delete placemark

• JSON persistence verified

Automated tests will be added in Release 3 or Release 4.

**Technologies Used**

• Node.js

• Hapi.js

• Handlebars

• Joi

• bcrypt

• LowDB (JSON storage)

• Vision / Inert

• Cookie Auth

• Bulma CSS

**Release Notes — v2.0.0**

This release includes:

**Placemark Features**

• Placemark model

• Add placemark form

• List user placemarks

• Delete placemark

• JSON store for placemarks

**Account Enhancements**

• User settings page

• Admin user list

• Admin delete user

**JSON Storage Layer**

• LowDB integration

• Persistent db.json

• Replaced mem stores with JSON stores

**UI Improvements**

• Authenticated menu

• Welcome menu

• Placemark view

• Admin view
