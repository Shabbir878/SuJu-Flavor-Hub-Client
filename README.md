# SuJu Flavor Hub

## Project Overview

SuJu Flavor Hub is a full-stack web application designed to bring together cooking enthusiasts, providing a platform for users to share, discover, and organize recipes. Targeting home cooks, culinary students, and anyone passionate about cooking, the platform allows users to post their favorite recipes, contribute interactive ingredient checklists, and share cooking time estimates. The community fosters the sharing of culinary knowledge and supports social engagement.

### Key Features

- **User Registration:** Create an account with email, password, and profile details.
- **Recipe Submission:** Post detailed recipes with ingredient lists and images.
- **Interactive Features:** Ingredient checklists and a built-in cooking timer.
- **Social Engagement:** Commenting, rating, following users, and upvoting/downvoting posts.
- **Premium Membership:** Access exclusive content through a subscription model.

## Project Objectives

- **Frontend and Backend Development:** Build separate components for a complete web application.
- **Authentication & Authorization:** Secure user authentication with JWT for logged-in sessions.
- **Database Integration:** Implement a MongoDB database for storing recipe data, user profiles, comments, and ratings.
- **Responsive UI/UX Design:** Create a mobile-friendly interface with responsive design.
- **Advanced Search:** Implement search functionality with filters for ingredients, cooking times, and categories.
- **Payment System:** Integrate online payment solutions for membership subscriptions.

## Functional Requirements

### 1. User Authentication & Authorization

- **User Registration**: Account creation with email and profile details.
- **Login & JWT-based Authentication**: Secure login with JWT tokens.
- **Password Recovery**: Password reset functionality via email.

### 2. User Profile Management

- **Profile Customization**: Update personal information and profile picture.
- **Social Connectivity**: Follow/unfollow other users.
- **Premium Membership**: Purchase subscriptions for premium content.

### 3. Recipe Management

- **My Recipes**: Display submitted recipes with filtering and sorting options.
- **Recipe Sharing**: Rich text editor support for formatting recipes.
- **Ingredient Checklist**: Track gathered ingredients interactively.
- **Timer Functionality**: Built-in timer for tracking cooking durations.
- **Recipe Deletion**: Manage recipes easily with delete options.

### 4. Rating, Commenting & Upvote/Downvote System

- **Rate Recipes**: Users can rate recipes (1 to 5 stars).
- **Commenting**: Leave comments and edit/delete them.
- **Upvote/Downvote**: Rank recipes based on user votes.

### 5. Recipe Feed

- **Dynamic Recipe Display**: Show recipes with title, image, and rating.
- **Advanced Search & Filter**: Search recipes by keywords and tags.
- **Infinite Scroll**: Seamless browsing experience.

### 6. User Management

- **Admin Controls**: Manage users and recipes, including account blocking.

## User Interface Design

### Required Pages

- **Login/Registration Page:** Secure forms for user registration and login.
- **User Dashboard:** Displays submitted recipes and profile options.
- **Admin Dashboard:** Manage recipes and user accounts.
- **Recipe Feed:** Lists all recipes with filtering and searching options.
- **Recipe Details Page:** Detailed view of recipes with comments and ratings.
- **Profile Page:** User profiles with their recipes and social connections.
- **About Us Page:** Information about the platform.
- **Contact Us Page:** A contact form for inquiries and support.

### Design Guidelines

- **Color Scheme:** Warm, inviting colors to reflect the culinary theme.
- **Navigation:** User-friendly navigation for easy access to content.
- **Mobile-Friendly:** Ensure responsiveness across all devices.

## Bonus Requirements

- **Micro Animations:** Smooth transitions and hover effects for a polished user experience.
- **Payment Integration:** Subscription payments for premium content access.
- **Content Ranking:** Upvote/downvote system to prioritize popular content.

## Optional Requirements

- **Social Media Integration:** Allow users to share recipes on social platforms.

## Technologies Used

### Frontend Development:

- **Next.js**
- **Redux**
- **TypeScript**

### Backend Development:

- **Node.js**
- **Express**
- **Mongoose**

### Database:

- **MongoDB**

## Installation

Clone the Repository:

```bash Copy code
git clone https://github.com/my-username/SuJu-Flavor-Hub-Client.git
git clone https://github.com/my-username/SuJu-Flavor-Hub-Server.git
```

### Install Dependencies:

```bash Copy code
npm install
```

### Backend Configuration:

Navigate to the backend folder:

```bash Copy code
cd SuJu-Flavor-Hub-Server
```

### Create .env File:

Create a .env file in the backend directory and add the following environment variables:

```plaintext Copy code
PORT=your_port
NODE_ENV=development
BYCRIPT_PASS=your_bycript_pass
DEFAULT_PASS=your_default_pass
DATABASE_URL=your_database_url
JWT_ACCESS_SECRET=your_jwt_access_secret
RESET_PASSWORD_EMAIL=your_reset_password_email
RESET_PASSWORD_PASSWORD=your_reset_password
STORE_ID=aamarpay_Store_id
SIGNETURE_KEY=aamarpay_ signature_key
PAYMENT_URL=aamarpay_payment_url
PAYMENT_VERIFY_URL=aamarpay_payment_verify_url
```

### Start the Backend Server:

```bash Copy code
npm start dev
```

### Frontend Configuration:

Navigate to the frontend folder:

```bash Copy code
cd Suju-Flavor-Hub-Client
```

### Install Frontend Dependencies:

```bash Copy code
npm install --legacy-peer-deps
```

### Start the Frontend Development Server:

```bash Copy code
npm run dev
```

### Admin

```
suju@gmail.com
Suju8788
```

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
