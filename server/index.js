const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());

const db = require('./models')

//Auth session
app.use(session({
    secret: process.env.SECRET,//should be automatically updated over time
    resave: false,//prevent unnecessary writes to the session store
    saveUninitialized: false,//if the session was created but no data was added to it, the session will still be saved in the store.
    cookie: {
        path: '/' // Available for all paths
    }
}));

//Allow cookies in front-end
app.use(cors({
    origin: 'http://localhost:3000', // Specify the allowed origin
    credentials: true, // Allow credentials (cookies)
}));

//Routes
const userRouter = require('./routes/Users');
const inventoryRouter = require('./routes/Inventory');
const profileRouter = require('./routes/Profile');
const recipeRouter = require('./routes/Recipes');
app.use('/user', userRouter);
app.use('/inventory', inventoryRouter);
app.use('/profile', profileRouter);
app.use('/recipes', recipeRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");//host http://localhost:3001/user
    });
});

