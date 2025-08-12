const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const ConnectDB = require('./config/mongoconnection');

const authRoutes = require('./routes/authRoute');
ConnectDB();

app.get('/', (req, res) => {
    res.send('Working')

})
app.use('/api/', authRoutes);

app.listen(process.env.PORT || 5050, () => {
    console.log(`Example app listening on port ${process.env.PORT || 5050}`)
})
