# Web-App-Development-Assignment1

**RELEASE 1**

**Author: Nathan Dolan**

**Student No: 20059337**

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

**RELEASE 3**

**Author: Nathan Dolan**

**Student No: 20059337**

**Overview**

Coffee Placemark is a full‑stack web application built using Hapi.js, Handlebars, and MongoDB.

It allows users to:

Create and manage coffee placemarks

Assign placemarks to categories

Upload images to placemarks

Edit and delete placemarks

Manage personal account settings

Authenticate via signup/login

Access an admin dashboard with user management tools

**Release 3 introduces:**

Full category filtering

Complete CRUD for placemarks and categories

Image upload using Multer

A polished admin dashboard

A fully structured layout + partials system

A complete settings page

A professional UI using Bulma CSS

**Features**
**Authentication**

User signup with validation

Secure login

Session‑based authentication

Settings page for updating user profile + password

**Placemarks**

Add new placemarks

Edit existing placemarks

Delete placemarks

Assign placemarks to categories

Upload images to placemarks

View placemark details

**Categories**

Add categories

Delete categories

Filter placemarks by category

Category name displayed in placemark tables and details

**Image Upload**

Uses Multer to store images in /public/uploads

Images displayed in placemark details view

**Admin Dashboard**

View total counts:

Users

Placemarks

Categories

View all users

Delete users

**UI & Layout**
Bulma CSS framework

Shared navigation menu

Shared welcome menu for login/signup

Main layout wrapping all views

Clean, consistent, responsive design

**Project Structure**

/views
  /layouts
    main-layout.hbs
  /partials
    menu.hbs
    welcome-menu.hbs
  dashboard-view.hbs
  placemark-view.hbs
  placemark-details-view.hbs
  placemark-edit-view.hbs
  category-view.hbs
  admin-dashboard-view.hbs
  admin-users-view.hbs
  login-view.hbs
  signup-view.hbs
  settings-view.hbs

/controllers
  accounts-controller.js
  placemark-controller.js
  category-controller.js
  admin-controller.js

/models
  user-mongo-store.js
  placemark-mongo-store.js
  category-mongo-store.js

/public
  /uploads
  /css
    style.css

/routes
  web-routes.js

/server.js

**Key Release 3 Additions**
**Category Filtering**

Implemented via:

Route: /placemarks/category/{id}

Controller: filterByCategory

View integration: dropdown with selected highlighting

**Image Upload**

Multer configuration

/placemark/{id}/uploadimage route

Images stored in /public/uploads

Displayed in details view

**Admin Dashboard**

Counts for users, placemarks, categories

Full user list

Delete user functionality

**Settings Page**

Update first name, last name, email, password

Joi validation

Error display

**Validation**

All forms use Joi validation:

Signup

Login

Settings

Add placemark

Edit placemark

Add category

Errors are displayed using Bulma notifications.

**Security**

Passwords hashed using bcrypt

Session authentication

Admin routes protected

User‑specific data isolation

**Installation & Setup**

1. Clone the repository:

   git clone <your-repo-url>
   cd coffee-placemark
   
2. Install dependencies:

   npm install

3. Start MongoDB:

   Ensure MongoDB is running locally or update your connection string

4. Run the server:

   npm start

5. Open the App:

   http://localhost:3000

   **RELEASE 4**

**Author: Nathan Dolan**

**Student No: 20059337**

**Description:**

Placemark Coffee is a full‑stack web application developed for Web App Development Assignment 1. The system enables users to create, manage, categorize, and review placemarks representing coffee shops and related locations. It includes user authentication, category management, administrative controls, and image upload functionality via Firebase Storage.

Release 4 focuses on integrating Firebase for image handling, improving UI consistency, refining placemark management, and addressing several stability issues identified during development.

**Features Implemented**

**Authentication:**

• User registration, login, and logout

• Session‑based authentication

• Role‑based access control for administrative features

**Placemarks**

• Create, edit, and delete placemarks

• Assign placemarks to categories

• Upload and display images using Firebase Storage

• View detailed placemark information

**Categories**

• Create and manage categories

• Display placemarks associated with each category

**Administration**

• View all registered users

• Delete users

• Access system‑wide data for moderation

**User Interface**

• Unified navigation bar with active link highlighting

• Consistent Bulma‑based layout

• Improved view templates and partials

**Architecture**
**Backend**

• Node.js

• Hapi.js

• Handlebars templating engine

• Joi validation

• Firebase Storage SDK

• Session‑based authentication

**Frontend**

• Handlebars views

• Bulma CSS framework

• Custom Handlebars helpers (e.g., ifEquals)

**Storage**

• Local JSON‑based data store

• Firebase Storage for image uploads

**Firebase Integration**

• Firebase Storage is used to handle image uploads for placemarks. The workflow is as follows:

• The user uploads an image through a multipart form.

• The server receives the file buffer.

• The file is uploaded to Firebase Storage.

• Firebase returns a publicly accessible URL.

• The URL is stored in the placemark object.

• The image is rendered in the UI using the stored URL.

**Known Issues with Firebase**

**1. Upload Failures**

• Some uploads fail due to incorrect MIME types, missing file buffers, or misconfigured Firebase credentials.

• Network instability can also cause intermittent failures.

**2. Images Not Displaying**

• In some cases, Firebase URLs are not saved correctly.

• Incorrect Handlebars variable names or missing fields can result in broken image links.

• Firebase Storage rules may block public access if not configured correctly.

**3. Duplicate Uploads**

• Uploading the same file multiple times may result in overwriting or duplicate entries depending on naming conventions.

**Image Handling Issues**

**1. Images Not Appearing in Placemark Cards**

• Caused by missing image fields in placemark objects, incorrect template bindings, or incomplete Firebase responses.

**2. Upload Route Not Triggering**

• Often due to missing multipart/form-data encoding in forms.

• Incorrect field names or missing Hapi payload configuration can prevent file buffers from being processed.

**Testing Issues**

**1.Intermittent Test Failures**

• Tests involving Firebase are not fully isolated or mocked, leading to inconsistent results.

• Asynchronous operations may not be awaited correctly.

**2.Test Suite Hanging**

• Occurs when promises are not resolved or when external SDKs (such as Firebase) remain active.

• Missing cleanup logic can cause the test runner to stall.

**Setup Instructions**

1. Install Dependencies

        npm install
2. Environment Configuration
   Create a .env file containing the following:

        FIREBASE_API_KEY=...
        FIREBASE_AUTH_DOMAIN=...
        FIREBASE_PROJECT_ID=...
        FIREBASE_STORAGE_BUCKET=...
        SESSION_SECRET=your-secret
   
3. Run the Application
        npm start

4. Access the Application
   Open a browser and navigate to:

   http://localhost:3000

**Application Functionality**

• Once the application is running and accessible at http://localhost:3000, users can interact with the full Placemark Coffee system. The platform provides both standard user functionality and administrative capabilities.

**User Registration and Authentication**
• Visitors can create an account using the Sign Up page and subsequently log in using their credentials. Session‑based authentication ensures that only registered users can access protected features such as placemark creation and category management.

**Placemark Management**
Authenticated users can create new placemarks representing coffee shops or related locations. Each placemark can include:

• Name

• Description

• Geographical coordinates

• Category assignment

• An uploaded image (stored in Firebase Storage)

Users may also edit or delete their own placemarks. All placemarks are displayed in a structured interface, allowing users to browse and review entries.

**Category Management**

• Users can create custom categories to organise their placemarks. Categories provide a way to group similar locations (e.g., “Cafés”, “Roasters”, “Study Spots”). Each category page displays all associated placemarks.

**Administrative Features**

• Users with administrative privileges have access to an extended set of tools:

• User Management: Administrators can view all registered users and remove accounts when necessary.

• System Overview: Administrative dashboards provide visibility into the number of users, categories, and placemarks stored in the system.

• Data Moderation: Administrators can oversee placemark content and ensure compliance with platform guidelines.

These features support both general user interaction and structured system oversight, enabling Placemark Coffee to function as a complete, multi‑user web application.

**Folder Structure:**

src/
  api/
  controllers/
  models/
  routes/
  views/
  utils/
  server.js
public/
test/
.env
package.json
README.md

**References:**

• Firebase (Storage, Firestore, Admin SDK, Uploading Images)
Pandey, M. (2025) How to upload image to Firebase Storage from your expressjs app. DEV Community.
Available at: https://dev.to/madhavp/how-to-upload-image-to-firebase-storage-from-your-expressjs-app 

• Marckhoz (2024) express-firestore-jwt-api: Professional REST API with Firebase Firestore and JWT authentication. GitHub Repository.
Available at: https://github.com/Marckhoz/express-firestore-jwt-api 

• JWT (Authentication, Route Protection, Token Issuance)
Charles, N. (2025) Building Secure APIs with Node.js and JWT Authentication. NIXX/DEV.
Available at: https://nixx.dev/articles/building-secure-apis-with-node-js-and-jwt-authentication 

• DevSanyamSrivastava (2024) Backend Tutorial Project: Node.js, Express.js, JWT authentication, file uploads, controllers, routes. GitHub Repository.
Available at: https://github.com/DevSanyamSrivastava/Project 

• pooja2s (2024) User Authentication Node.js JWT Token Post CRUD Operations. GitHub Repository.
Available at: https://github.com/pooja2s/user-authentication-node-js-jwt-token-post-crud-operations 

• Multer (File Upload Middleware)
Pandey, M. (2025) How to upload image to Firebase Storage from your expressjs app. DEV Community.
(Contains Multer memory storage configuration and file filtering.)
Available at: https://dev.to/madhavp/how-to-upload-image-to-firebase-storage-from-your-expressjs-app 

• pooja2s (2024) User Authentication Node.js JWT Token Post CRUD Operations. GitHub Repository.
(Shows Multer usage for multipart/form-data uploads.)
Available at: https://github.com/pooja2s/user-authentication-node-js-jwt-token-post-crud-operations 

• API Controllers, Routes, MVC Architecture
Marckhoz (2024) express-firestore-jwt-api: Professional REST API with Firebase Firestore and JWT authentication. GitHub Repository.
(Provides layered architecture: controllers, routes, services, middlewares.)
Available at: https://github.com/Marckhoz/express-firestore-jwt-api 

• DevSanyamSrivastava (2024) Backend Tutorial Project: Node.js, Express.js, JWT authentication, file uploads, controllers, routes. GitHub Repository.
Available at: https://github.com/DevSanyamSrivastava/Project 

• pooja2s (2024) User Authentication Node.js JWT Token Post CRUD Operations. GitHub Repository.
(Shows controllers, routes, middlewares, and validation.)
Available at: https://github.com/pooja2s/user-authentication-node-js-jwt-token-post-crud-operations

• Testing (JWT flows, API endpoints, middleware)
Charles, N. (2025) Building Secure APIs with Node.js and JWT Authentication. NIXX/DEV.
(Provides testable JWT flows and token verification patterns.)
Available at: https://nixx.dev/articles/building-secure-apis-with-node-js-and-jwt-authentication 

• Pandey, M. (2025) How to upload image to Firebase Storage from your expressjs app. DEV Community.
(Contains testing and verification section for Firebase uploads.)
Available at: https://dev.to/madhavp/how-to-upload-image-to-firebase-storage-from-your-expressjs-app 
