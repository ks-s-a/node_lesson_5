var mysql = require('mysql');

var todoId = '4';

var connectionPool = mysql.createPool({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

connectionPool.getConnection(function (err, connection) {
  if (err)
    console.error(err);

  var query = _getFormattedQuery(todoId);

  connection.query(query, function (err, rows) {
    console.log('rows is: ', rows);

    connection.release()
  });

  // connection.query('select * from todos where id = ?;', [todoId], function (err, rows) {
  //   console.log('rows is: ', rows);

  //   connection.release()
  // });

  // var newData = {
  //   text: 'new text',
  //   completed: 'true',
  // };

  // connection.query('update todos set ? where id = ?;', [newData, todoId], function (err, rows) {
  //   console.log('rows is: ', rows);

  //   connection.release()
  // });
});

function _getEscapedQuery(todoId) {
  var todoIdEscaped = mysql.escape(todoId);

  return 'select * from todos where id = '+ todoIdEscaped +';';
}

function _getFormattedQuery(todoId) {
  var query = 'select * from ?? where ?? = ?;';

  return mysql.format(query, ['todos', 'id', todoId]);
}
