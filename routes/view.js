// Dependencies

const express = require('express');
const router  = express.Router();

// ------------------------------------------------------------------
// Root

router.get('/', function(req, res, next) {
	return res.render('index');
});

// ------------------------------------------------------------------
// Export module

module.exports = router;