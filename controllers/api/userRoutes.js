const router = require("express").Router();
const { User } = require("../../models");


// CREATE new user
router.post("/", async (req, res) => {
  try {
    // create user in database
    const dbUserData = await User.create(req.body);
    // set the session flag
    req.session.loggedIn = true;
    req.session.userId = dbUserData.id;
    // reply to client
    res.status(200).json(dbUserData);
  } catch (err) {
    // output error to console
    console.log(err);
    // send error to client
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // load user object form database
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // handle "user not found case"
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // check user password
    const validPassword = await dbUserData.checkPassword(req.body.password);

    // handle incorrect
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }


      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.loggedIn = true;
        res.json({ user: userData, message: "You are now logged in!" });
      });

    console.log(req.session.loggedIn);
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
