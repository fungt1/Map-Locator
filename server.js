const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');

// load env vars
dotenv.config({ path: './config/config.env' });

//Passport config
require('./config/passport')(passport);

//connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


//Enable cors
app.use(cors());

//static folder
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/views')));
app.set('view engine', 'html');

//Routes
app.use('/api/v1/stores', require('./routes/stores'));
app.use('/api/v1/users', require('./routes/users'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);