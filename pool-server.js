var mysql = require('mysql');

var connectionPool = mysql.createPool({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

connectionPool.getConnection(function (err, connection) {
  if (err)
    console.error(err);

  connection.query('select * from todos;', function (err, rows) {
    console.log('rows is: ', rows);

    connection.release();
  });
});
