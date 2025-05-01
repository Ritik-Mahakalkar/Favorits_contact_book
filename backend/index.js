const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./components/routes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://ritikmahakalkar:9763767457@cluster0.tgdlozd.mongodb.net/favorite_contact_book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));


app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
