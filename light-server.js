var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

connection.connect(function (err) {
  if (err)
    console.error(err);
});

connection.query('insert into todos (text, completed) values ("another task", "false");', function (err, info) {
  if (err)
    console.error(err);

  console.log('info is: ', info);
});

connection.query('select * from todos;', function (err, rows) {
  if (err)
    console.error(err);

  console.log('rows is: ', rows);
});

connection.end();
