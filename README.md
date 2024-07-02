# Fire Blog

Welcome to the Fire Blog project! This is a dynamic, responsive blog platform built with React, Firebase, and other modern web development tools. It offers a seamless user experience across all devices, enabling users to read, add, and manage blog posts with ease.

## Live Site
Visit the live site: [Fire Blog](https://fireblog-e3426.web.app)

## Key Features
- **Responsive Design**: The website is fully responsive, providing an optimal viewing experience on mobile, tablet, and desktop devices.
- **User Authentication**: Secure user authentication with email/password and Google login.
- **Dynamic Blog Management**: Users can add and edit their blog posts. Each blog post includes a title, image, short description, and category.
- **Wishlist Functionality**: Users can add blogs to their wishlist for easy access later.
- **Comments System**: Users can comment on blog posts, with real-time updates and author information.
- **Newsletter Subscription**: Users can subscribe to the newsletter to receive updates.
- **Feature Blogs**: A special page that lists the top 10 blog posts based on content length.
- **Tech Trends**: Stay updated with the latest tech trends directly on the platform.
- **Discussion Forum**: Engage with the community by asking questions, liking, and replying to questions. 

## Technologies Used
- **Frontend**: React, Framer Motion, Tailwind CSS, Skeleton Loader
- **Backend**: Node.js, Express, MongoDB, JWT
- **Authentication**: Firebase Auth
- **Hosting**: Firebase and Vercel
- **Other Libraries**: Tanstack Table, Tanstack Query

## Steps to Clone and Run the Project Locally
To clone and run the Fire-Blog project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Tosiqul-Islam-Sopon/Fire-Blog-client.git
2. **Install dependencies for the client:**
   ```sh
   cd client
   npm install
3. **Clone server-side repository:**
   ```sh
   git clone https://github.com/Tosiqul-Islam-Sopon/Fire-Blog-server.git
4. **Install dependencies for the server:**
   ```sh
   cd server
   npm install
5. **Run the client and server:**
   ```sh
   # In the client directory
   nodemon index.js

   # In the server directory
   npm run dev
