var connection = require('./connection.js')

function printQuestionMarks(numVals) {
    var arr = [];

    for (var i = 0; i < numVals; i++) {
        arr.push("?");
    }
    return arr.toString();
}

var orm = {
    // TODO: Create ORM routes that will speak to the SQL server to send to the model => controller to be defined.

    selectAll: function (table, next) {
        var queryString = "SELECT * FROM " + table + ";";
        console.log(queryString)
        connection.query(queryString,
            function (err, res) {
                if (err) {
                    throw err;
                }
                next(res);
            })

    },

    insertOne: function (table, col, val, next) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += col.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(val.length);
        queryString += ") ";

        console.log(queryString)

        connection.query(queryString, val, function (err, result) {
            if (err) {
                throw err;
            }

            next(result);
        })
    },
    updateOne: function (table, col) {

    }

}

module.exports = orm;