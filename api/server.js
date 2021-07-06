const express = require('express');
const cors = require('cors');
const badges = require('./routes/badges');
const collections = require('./routes/collections');
const members = require('./routes/members');
const member = require('./routes/member');
const points = require('./routes/points');
const db = require('./config/db')

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/badges', badges);
app.use('/api/collections', collections);
app.use('/api/members', members);
app.use('/api/member', member);
app.use('/api/points', points);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});