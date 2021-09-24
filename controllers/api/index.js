const router = require('express').Router();
const userRoutes = require('./userRoutes');
const habitRoutes = require('./habitRoutes');
const logRoutes = require('./logRoutes');

router.use('/users', userRoutes);
router.use('/habits', habitRoutes);
router.use('/log', logRoutes);

module.exports = router;