const router = require("express").Router();

// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  res.status(200).json({ message: "hello world" });
});


module.exports = router;