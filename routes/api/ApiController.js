const express = require('express');
const router = express.Router();

const userManager = require('../../utils/UserController');

router.post('/', async (req, res) => {
    const { action } = req.query;

    const { username, password } = req.body;

    switch (action) {
        case 'userlist':
            const users = await userManager.getUserList();
            res.json(users);
            break;
        case 'login':
            const authenticated = await userManager.authenticate(username, password);
            if (authenticated) {
                res.json({ status: 'success', message: 'Access granted!' });
            } else {
                res.status(401).json({ status: 'error', message: 'Access denied!' });
            }
            break;
        case 'register':
            const userId = await userManager.register(username, password);
            if (userId) {
                res.json({ status: 'success', message: 'User registered successfully!' });
            } else {
                res.status(500).json({ status: 'error', message: 'Failed to register user!' });
            }
            break;
        default:
            res.status(400).json({ status: 'error', message: 'Invalid action!' });
    }
});


module.exports = router;
