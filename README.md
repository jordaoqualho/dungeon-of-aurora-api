# Dungeon of Aurora API

This is the backend API for Dungeon of Aurora, an exciting text-based adventure game set in a magical world filled with dungeons, monsters, and quests. The API is built using Nest.js, a powerful Node.js framework.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with Dungeon of Aurora API, follow these instructions to set up the project locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org) (version >= 12)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [MongoDB](https://www.mongodb.com/) (running locally or on a remote server)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jordaoqualho/dungeon-of-aurora-api.git
cd dungeon-of-aurora-api
```


2. Install the dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a .env file in the root directory of the project and set the necessary environment variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dungeon_of_aurora
JWT_SECRET=your_jwt_secret_here
```

## Usage
To start the development server, run:

```bash
npm run start:dev
```

The API will be available at http://localhost:3000 by default.

## API Endpoints

The API provides the following endpoints:

- **GET /api/monsters**: Get a list of all monsters in the game.
- **GET /api/monsters/:id**: Get details of a specific monster by its ID.
- **POST /api/players**: Create a new player in the game.
- **GET /api/players/:id**: Get player information by ID.
- **PUT /api/players/:id**: Update player information by ID.
- **DELETE /api/players/:id**: Delete a player from the game.

For more detailed API documentation, refer to the [API documentation](link-to-your-documentation).

## Contributing

Contributions to Dungeon of Aurora API are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

Dungeon of Aurora API is open-source and distributed under the MIT License.
