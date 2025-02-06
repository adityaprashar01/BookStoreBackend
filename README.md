### 📚 BookStore Backend

A Node.js and MongoDB-based backend for a BookStore application. This API allows users to manage books, handle authentication, and perform CRUD operations.

## 🚀 Features  
- User authentication (JWT-based)  
- CRUD operations for books  
- API endpoints for managing users & orders  
- MongoDB for database storage  
- Express.js for handling routes  

## 🛠 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Package Manager:** npm  

## 🔧 Installation  
### Prerequisites  
- Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.com/try/download/community)  

### Steps to Run Locally  
1. Clone the repository:  
   ```sh
   git clone https://github.com/adityaprashar01/BookStoreBackend.git
   ```
2. Navigate to the project folder:  
   ```sh
   cd BookStoreBackend
   ```
3. Install dependencies:  
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the required environment variables:  
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
5. Start the server:  
   ```sh
   npm start
   ```
   The server will run at **http://localhost:5000**.

## 📌 API Endpoints  

### 🔑 Authentication  
| Method | Endpoint        | Description               |
|--------|----------------|---------------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login & get token  |

### 📚 Books  
| Method | Endpoint        | Description            |
|--------|----------------|------------------------|
| GET    | `/api/books`   | Get all books         |
| GET    | `/api/books/:id` | Get a book by ID     |
| POST   | `/api/books`   | Add a new book        |
| PUT    | `/api/books/:id` | Update book details |
| DELETE | `/api/books/:id` | Remove a book        |

### 🛒 Orders  
| Method | Endpoint       | Description           |
|--------|---------------|-----------------------|
| POST   | `/api/orders` | Place an order       |
| GET    | `/api/orders` | Get user orders      |

## 🏗️ Project Structure  
```
BookStoreBackend/
│── controllers/  # Business logic for routes
│── models/       # Mongoose schemas
│── routes/       # API endpoints
│── middleware/   # Authentication & validation
│── config/       # Database connection
│── server.js     # Entry point
│── .env          # Environment variables
│── package.json  # Dependencies
```

## 🌟 Contributing  
Feel free to fork the repo, create a new branch, and submit a pull request.  

## 📜 License  
This project is licensed under the MIT License.  
