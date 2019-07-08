var orm = require("../config/orm.js");

var dog = {
    all: function(next) {
        orm.selectAll("doggies", function(res) {
            next(res);
        })
    },
    create: function(col, val, next) {
        orm.insertOne("doggies", col, val, function(res) {
            next(res);
        }) 
    },
    update: function(cols, condition, next) {
        orm.updateOne("doggies", cols, condition, function(res) {
            next(res);
        })
    }
}

module.exports = dog;