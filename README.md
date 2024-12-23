# Instagram Clone

An Instagram clone built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project is a replica of the popular social media platform Instagram, offering core features like user authentication, post creation, likes, comments, and more.

---

## Features

- **User Authentication:** Sign up, log in, and log out functionality.
- **Profile Management:** View and edit user profiles and see other user's profiles.
- **Post Management:**
  - Create new posts with captions.
  - View posts in a feed.
  - Like and comment on posts.
- **Follow System:**
  - Follow/unfollow users.
  - View posts from followed users in the feed.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Context
- **Image Uploads:** Supabase Cloud
- **Authentication:** Supabase Authentication

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- MongoDB

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/instagram-clone.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd instagram-clone
   ```

3. **Install dependencies for the backend:**
   ```bash
   npm install
   ```

4. **Install dependencies for the frontend:**
   ```bash
   cd client
   npm install
   ```

5. **Set up environment variables:**

   Create a `config` folder in root directory and the create `dev.env` file inside this directory:
   ```env
   SERVER_PORT="5000"
   MONGODB_URL=your_mongodb_connection_string
   BACKEND_URL="http://localhost:5000"
   FRONTEND_URL="http://localhost:5173"
   SUPABASE_URL=supabase_url
   SUPABASE_KEY=supabase_key
   ```

6. **Start the development servers (Make sure to run all the scripts in root directory) :**
   - Start the backend and frontend:
     ```bash
     npm start
     ```
   - Start the MongoDB server:
     ```bash
     mongodb/local/database/command
     ```

7. **Open the application:**
   Visit ([http://localhost:5173/signup](http://localhost:5173/signup)) in your browser.

---

## Folder Structure

```
instagram-clone/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── ...
└── README.md
└── config/
    ├── dev.env
```

---

## Features in Development

- Direct Messaging (DMs)
- Stories
- Notifications

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---


## Contact

For inquiries, reach out at:

- **Email:** pratiyank49@gmail.com
- **GitHub:** [Pratiyankkumar](https://github.com/Pratiyankkumar)

---

## Acknowledgments

- Thanks to the MERN stack community for tutorials and guidance.
- Inspired by Instagram's functionality and design.
