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

