React User Management System
A simple user management system built with React, utilizing role-based access control (RBAC) for user roles and permissions, login, signup, and admin functionalities. The application provides a dashboard where users can manage their profiles, while admins can manage all users, including assigning roles and permissions.

Features
Login/Signup: Users can register and log in with their email and password.
Role-based Access Control: Admin users can manage roles and permissions, and access restricted features based on their role.
Protected Routes: Certain routes are protected and accessible only to authenticated users with specific roles.
Admin Dashboard: Admin users can add, edit, or delete users, and manage roles and permissions.
Local Storage: User data is stored in local storage for persistence.
Technologies Used
React: A JavaScript library for building user interfaces.
Material-UI: A popular React UI framework for building responsive layouts and interactive components.
React Router: For routing between different pages and components.
Context API: For managing authentication state across the app.

Installation
To set up the project locally:

Clone the repository:
git clone https://github.com/yourusername/react-user-management.git

Navigate to the project directory:
cd react-user-management

Install the dependencies:
npm install

Start the development server:
npm start

Open the application in your browser:
http://localhost:3000


File Structure
The project structure is organized as follows:

src/
│
├── pages/
│   ├── AdminPage.js         # Admin Dashboard where users can be managed
│   ├── Home.js              # Home page displaying user information
│   ├── Login.js             # Login page for existing users
│   ├── RoleManagement.js    # Page for managing roles and permissions
│   ├── Signup.js            # Signup page for new users
│   ├── Permissions.js       # Page for managing permissions for a role
│
├── components/
│   ├── Header.js            # Navigation bar with login/logout functionality
│   ├── ProtectedRoute.js    # Higher-order component for protected routes
│
├── utils/
│   └── LocalStorage.js      # Utility for managing local storage operations
│
├── context/
│   └── AuthContext.js       # Context for managing authentication state
│
├── constants/
│   └── mockData.js          # Mock data for users, roles, and permissions
│
├── App.js                   # Main component, renders routes
└── index.js                 # Entry point for the React app
Key Components
Header.js
This component displays a navigation bar with a greeting and logout button. It shows the logged-in user's username and provides a logout button that redirects to the login page.

ProtectedRoute.js
A higher-order component that checks if the user is authenticated and if they have the required role to access the page. If not, they are redirected to the login page.

mockData.js
This file contains mock user data, including user credentials, roles, and permissions. It also provides utility functions for getting, saving, and adding users to local storage.

AuthContext.js
Manages the authentication state of the user, providing login, logout, and current user data across the application.

Login.js & Signup.js
These components handle user authentication. Login.js allows existing users to log in, while Signup.js lets new users register. Both forms validate user input and store the user data in local storage.

AdminPage.js
An admin-only page that displays a list of all users with actions to add, edit, or delete users. Admins can manage user roles and permissions directly from this page.

Permissions.js
Allows admins to manage and assign permissions to different roles, such as "read," "write," and "delete."

How to Use
User Registration: Navigate to the signup page (/signup) to create a new user account. After registration, you will be redirected to the login page.

Login: Use your credentials to log in at the login page (/login). Once logged in, you will be redirected to the home page (/home), where you can view your profile and role details.

Admin Panel: If you are an admin user, you will see the "Go to Admin Panel" button in your home page, which takes you to the admin dashboard (/admin). In this panel, you can manage users, roles, and permissions.

Role-Based Access: Some routes and features are protected, meaning only users with specific roles can access them. Unauthorized users will be redirected to the login page.