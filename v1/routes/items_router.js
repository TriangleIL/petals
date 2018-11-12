const express = require('express');
const { ItemsService } = require('v1/services');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const items = await ItemsService.getAllItems();
      res.status(200).json(items);
    } catch (e) {
      res.status(e.status || 400).json(e);
    }
  });

module.exports = router;
