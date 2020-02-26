const express = require('express');
const { getStores, addStore, deleteStore } = require('../controllers/stores');

const router = express.Router();

router.route('/').get(getStores).post(addStore);

router.route('/').get(getStores).delete(deleteStore);


module.exports = router;