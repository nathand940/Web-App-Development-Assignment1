**Release 1**

**Release Date: 01 November 2026**

**Author: Nathan Dolan**

CoffeePlacemark is a web application that allows users to create, manage, and explore coffee shop placemarks.
This release establishes the core foundation of the system: user accounts, authentication, routing, and initial project structure.

Release 1 focuses on building a stable base for all future features (placemarks, categories, images, admin tools, MongoDB, API, JWT, Swagger, deployment).

**Features Included in Release 1**

**User Accounts**

• User Signup

• User Login

• Secure password hashing (bcrypt)

• Cookie‑based session authentication

• Logout functionality

• Joi validation for signup & login

• Error handling and user feedback

**Dashboard** 

• Protected route (/dashboard)

• Displays logged‑in user information

• Uses Handlebars templating

• Foundation for future placemark and admin features

**Project Structure** 

• Clean MVC layout

• Controllers, routes, models, views

• Mem store for user data

• Disabled placeholder API routes

• Ready for JSON + Mongo stores in Release 2

**Server Configuration**

• Hapi server

• Vision + Inert for views/static files

• Cookie authentication strategy

• Handlebars view engine

• Layouts + partials folder structure

**Folder Structure (Release 1)**

coffee-placemarks/
│
├── src/
│   ├── controllers/
│   │   ├── accounts-controller.js
│   │   └── dashboard-controller.js
│   │
│   ├── models/
│   │   ├── mem/
│   │   │   └── user-mem-store.js
│   │   └── joi-schemas.js
│   │
│   ├── routes/
│   │   └── web-routes.js
│   │
│   └── views/
│       ├── signup-view.hbs
│       ├── login-view.hbs
│       ├── dashboard-view.hbs
│       ├── layouts/
│       └── partials/
│
└── server.js

**Authentication Flow**

User signs up → data stored in mem store

User logs in → password validated via bcrypt

Cookie session created → { id: user._id }

Protected routes require valid session

Dashboard displays authenticated user

This flow forms the backbone of all future features.

**Testing Status (Release 1)**

Manual testing completed:

• Signup form validation

• Login form validation

• Incorrect password handling

• Missing fields handling

• Cookie session creation

• Dashboard access only when logged in

• Logout clears session

Automated tests will be added in Release 3.

**Technologies Used**

• Node.js

• Hapi.js

• Handlebars

• Joi

• bcrypt

• Vision / Inert

• Cookie Auth

**Roadmap**

**Release 2 – Placemark Core**

• Placemark model

• Add placemark form

• List user placemarks

• JSON store

• Basic placemark API

**Release 3 – MongoDB + Categories + Images**

• MongoDB integration

• Category system

• Image uploads

• Admin user list/remove

• Dashboard analytics

**Release 4 – API + JWT + Swagger + Deployment**

• Full REST API

• JWT authentication

• Swagger documentation

• Automated tests

• Deployment to Render + MongoDB Atlas

• Exceptional features (roles, profile images, activity logs)
