const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require("./dashboardRoutes");
const appRoutes = require("./appRoutes");


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/app", appRoutes);

module.exports = router;