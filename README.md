
# Moath-Awaja-Blogging-System

## Description

Blogging System is a RESTful API built using Node.js, Express.js, and TypeScript, with Sequelize ORM connecting to a MySQL database. The system supports creating and managing blog posts, categories, and comments, and includes user authentication and authorization. The project aims to provide a robust backend for a blogging platform with features like automated testing, CI/CD workflows using GitHub Actions, and Docker deployment.

## Features

- **User Authentication and Authorization**: Secure user login and registration using JWT.
- **Blog Post Management**: CRUD operations for blog posts.
- **Category Management**: Assign categories to posts.
- **Comment System**: Users can comment on posts.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: Typed superset of JavaScript for enhanced code quality.
- **Sequelize**: ORM for interacting with MySQL database.
- **MySQL**: Relational database management system.


## Installation

1. **Clone the Repository**:
   \`\`\`bash
   git clone https://github.com/TAP-SD-0624/Moath-Awaja-Blogging-System.git
   cd Moath-Awaja-Blogging-System
   \`\`\`

2. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Set Up Environment Variables**:
   Create a \`.env\` file in the root directory and add the following variables:
   \`\`\`env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=blogging_system
   JWT_SECRET=yourjwtsecret
   \`\`\`

4. **Run Migrations**:
   \`\`\`bash
   npx sequelize-cli db:migrate
   \`\`\`

5. **Start the Application**:
   \`\`\`bash
   npm start
   \`\`\`

## Running Tests

To run the tests, use the following command:
\`\`\`bash
npm test
\`\`\`

## API Endpoints

### User Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.

### Blog Posts
- **GET /api/posts**: Get all posts.
- **GET /api/posts/:postId**: Get a single post by ID.
- **POST /api/posts**: Create a new post.
- **PUT /api/posts/:postId**: Update a post by ID.
- **DELETE /api/posts/:postId**: Delete a post by ID.

### Categories
- **GET /api/categories**: Get all categories.
- **POST /api/posts/:postId/categories**: Add a category to a post.

### Comments
- **GET /api/posts/:postId/comments**: Get all comments for a post.
- **POST /api/posts/:postId/comments**: Add a comment to a post.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the contributors and the open-source community for their support and contributions.
