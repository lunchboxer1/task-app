const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismynewcourse');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();

    }

    req.token = token;
    req.user = user;
    next()
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." })

  }
}

module.exports = auth;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU2MjFmYTViM2E4NmJhYWFiYmEyYWIiLCJpYXQiOjE2NDI0NzE5MzB9._0UQviU2Pcm0jko-GaPLHHlehn1uasv85q4KQ2J1k0E