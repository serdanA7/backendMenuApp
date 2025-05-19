require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./repos/db');

const PORT = process.env.PORT || 3001;

// Connect to database
connectDB()
  .then(() => {
    console.log('Database connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }); 