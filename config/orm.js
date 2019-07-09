var connection = require('./connection.js')

function printQuestionMarks(numVals) {
    var arr = [];

    for (var i = 0; i < numVals; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
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
    updateOne: function (table, col, condition, next) {
        console.log("col obj to string:", col.toString())

        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(col);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(
            queryString,
            function (err, result) {
                if(err) {
                    throw err;
                }

                next(result);
            }
        )
    },

    deleteOne: function (table, id, next) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE id = ";
        
    }

}

module.exports = orm;