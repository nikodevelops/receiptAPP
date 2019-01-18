var express = require("express");
var router = express.Router();
var Receipt = require("../models/Receipt");

router.get("/", function(req, res) {
  Receipt.find({}, function(err, foundReceipt) {
    if (err) {
      console.warn(err);
    } else {
      res.render("receipts/index", { receipt: foundReceipt });
    }
  });
});

router.get("/new", function(req, res) {
  res.render("receipts/new");
});

router.post("/new", function(req, res) {
  Receipt.create(req.body.receipt, function(err, createdReceipt) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/receipts");
    }
  });
});

router.get("/:id", function(req, res) {
  Receipt.findById(req.params.id, function(err, foundReceipt) {
    if (err) {
      console.warn(err);
    } else {
      res.render("receipts/show", { receipt: foundReceipt });
    }
  });
});

module.exports = router;
