const express = require('express');
const cors = require('cors');  //cross origin resource sharing
const app = express();

//listen from port
 var corsOptions = {
    origin: 'http://localhost/3001'
 };
app.use(cors(corsOptions));

//parse incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

//parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({extended: true}));

const db = require('./app/models');

db.sequelize.sync();
//for devel to recreate each time database 
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get('/', (req, res) => {
    res.send('<h2> Welcome to Survey Backend! <h2>');
})

require('./app/routes/adminUserRoutes')(app);

//port to listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



