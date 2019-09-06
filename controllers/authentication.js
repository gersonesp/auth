const User = require("../models/user");

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (error, existingUser) => {
    if (error) {
      return next(error);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({
      email,
      password
    });

    user.save(error => {
      if (error) {
        return next(error);
      }

      res.json({ success: true });
    });
  });
};
