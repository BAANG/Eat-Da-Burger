var express = require('express');
var router = express.Router();

var dog = require('../models/doggy.js');

router.get("/", function (req, res) {
    dog.all(function (data) {
        var allDogs = {
            dogs: data
        };
        console.log(allDogs);
        res.render("index", allDogs);
    })
});

router.post("/api/dogs", function (req, res) {
    dog.create([
        "doggy_name", "isGoodBoy"
    ], [
            req.body.name, req.body.isGood
        ], function (result) {
            res.json({ id: result.insertID })
        })
});

router.put("/api/dogs/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log ("This is the condition:", condition);

    dog.update({
        isGoodBoy: req.body.isGood
    }, condition, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;