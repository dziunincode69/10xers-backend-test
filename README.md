# 10xers Backend Test

This project is a backend system designed for testing purposes using Node.js and Sequelize as the ORM to manage database operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you start, ensure you have the following software installed:

- Node.js (12 or higher recommended)
- npm (Node Package Manager)
- A supported SQL database (e.g., PostgreSQL, MySQL) installed and running

### Installation

1. **Clone the repository**
   Clone the project to your local machine using:
   ```bash
   git clone https://github.com/your-username/10xers-backend-test.git
   cd 10xers-backend-test
   ```
2. **Set Up**
   1. Edit The config file
   2. npm install
   3. initialize DB
   ```
   sequelize db:create && sequelize db:migrate
   ```
3. **Run**
   ```
   npm run start
   ```
   **Testing**
   ```
   npm run db_test_init &&
   npm run test
   ```


### API DOC
https://662eb8ce6a97621a32b37cea--gregarious-wisp-5cb374.netlify.app/

**Result Testing**
<img width="978" alt="image" src="https://github.com/dziunincode69/10xers-backend-test/assets/55616294/ecc48a20-94c1-4460-b96e-2780efce1cbc">

