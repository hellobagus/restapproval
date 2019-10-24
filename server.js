/* REQUIRES */
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = express.Router();


/* MODULES */
const sql = require('./sql');
const session = require('./session');

const app = express();

/* USES */
app.use(bodyparser.json());
app.use(cors());

app.use(session.passport.initialize());

/* ROUTES */
router.get('/', function(req, res) {
	res.send('Welcome to the API/Back-end!');
});

router.post('/login', session.passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
	
	req.token = session.generateToken(req.user);
	res.json({
		token: req.token,
		user: req.user
	});

});

router.get('/me', session.check, function(req, res) {
  res.json(req.user);
});

app.use('/api/v1', router)

/* START SERVER */
app.listen(process.env.PORT || 3000);