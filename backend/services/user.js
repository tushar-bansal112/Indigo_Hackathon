const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = process.env;
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const data = req.body;
    const { email, password, number, isadmin } = data;
    var user = await User.findOne({ email });
    if (!(email && password && number)) {
      return res.status(400).send("All input is required");
    }
    if (user === null) {
      var encryptedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone_number: number,
        isAdmin: isadmin,
      }).catch((error) => {
        console.error("Error saving user in db:", error);
      });
    }

    const id = user._id;

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email, id, isadmin }, config.TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      return res.status(200).json({
        email: user.email,
        _id: user._id,
        token: user.token,
        isadmin: user.isAdmin,
      });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("err");
  }
};

module.exports = {
  login: login,
};
