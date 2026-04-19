# Live Suggestions App

A real-time suggestion box application built with React and Node.js.

## Project Structure

```
Live-Suggestions/
├── Client/          # React Frontend
├── Server/          # Node.js Backend
└── README.md        # Project Documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (or yarn)

### Installation

1. **Clone the repository** (if you haven't already)

2. **Install dependencies for the Server:**
   ```bash
   cd Server
   npm install
   ```

3. **Install dependencies for the Client:**
   ```bash
   cd Client
   npm install
   ```

### Running the Application

1. **Start the Server:**
   ```bash
   cd Server
   npm start
   ```
   The server will start on `http://localhost:5000`.

2. **Start the Client:**
   ```bash
   cd Client
   npm run dev
   ```
   The client will open on `http://localhost:5173`.

## Usage

- Open the client in your browser.
- Type suggestions in the input box.
- Suggestions will appear in real-time for all connected users.

## Technologies Used

### Frontend
- **React**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **Mongoose**: MongoDB ODM

