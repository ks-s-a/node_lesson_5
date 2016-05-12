// Security aspects of database usage
var mysql = require('mysql');

// Try to hack us
var todoId = '7 OR 1 = 1';

// Conection pool creating
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

  // Handling parameters via mysql.escape method
  var query = _getEscapedQuery(todoId);

  // Handling query text via mysql.format method
  var query = _getFormattedQuery(todoId);

  // Query executing
  connection.query(query, function (err, rows) {
    console.log('rows is: ', rows);

    connection.release();
  });

  // Use array of parameters for query replacing
  connection.query('select * from todos where id = ?;', [todoId], function (err, rows) {
    if (err)
      return console.error(err);

    console.log('rows is: ', rows);

    connection.release();
  });

  // Object of our query data
  var newData = {
    text: 'new text',
    completed: 'true',
  };

  // Use objects for set multiple fields in query
  connection.query('update todos set ? where id = ?;', [newData, todoId], function (err, rows) {
    if (err)
      console.error(err);

    console.log('rows is: ', rows);

    connection.release()
  });
});

// Method with mysql.escape usage
function _getEscapedQuery(todoId) {
  var todoIdEscaped = mysql.escape(todoId);
  
  return 'select * from todos where id = '+ todoIdEscaped +';';
}

// Method with mysql.format usage
function _getFormattedQuery(todoId) {
  var query = 'select * from ?? where ?? = ?;';

  return mysql.format(query, ['todos', 'id', todoId]);
}
