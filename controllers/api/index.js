const router = require('express').Router();
const userRoutes = require('./userRoutes');
const habitRoutes = require("./habitRoutes");
const chartRoutes = require("./chartRoutes");
const logRoutes = require('./logRoutes');

router.use('/users', userRoutes);
router.use("/habits", habitRoutes);
router.use('/log', logRoutes);
router.use("/chart", chartRoutes);

module.exports = router;