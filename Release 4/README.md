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
