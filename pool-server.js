// Example of connection pool usage
var mysql = require('mysql');

// Configurating connection pool
var connectionPool = mysql.createPool({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

// Get connection from pool
connectionPool.getConnection(function (err, connection) {
  if (err)
    return console.error(err);

  // Get all tasks with pool connection usage
  connection.query('select * from todos;', function (err, rows) {
    if (err)
      return console.error(err);

    console.log('rows is: ', rows);

    // Release connection and return it into the pool
    connection.release();
  });
});

// External method for module using
function getTasks(callback) {
  connectionPool.getConnection(function (err, connection) {
    if (err)
      console.error(err);

    connection.query('select * from todos;', callback);
    connection.end(); // We use end method,
                      // because we don't have access into callback function
  });
}

// Export method for futher usage
module.exports.getTasks = getTasks;
