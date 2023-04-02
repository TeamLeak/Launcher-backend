const express = require('express');

const userManager = require("../../utils/UserController");

const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const userList = await userManager.getUserList();
    const tableRows = userList.map(user => `<tr><td>${user.name}</td><td>${user.password}</td></tr>`).join('');
    const table = `<table><thead><tr><th>Name</th><th>Password</th></tr></thead><tbody>${tableRows}</tbody></table>`;
    res.send(table);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user list!');
  }
});

module.exports = router;
