// Single connection query to a database
var mysql = require('mysql');

// Configuration of connection
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

// Estimate connection
connection.connect(function (err) {
  if (err)
    return console.error(err);
});

// Add task and get all task with new one
connection.query('insert into todos (text, completed) values ("pretty task", "true");', function (err, info) {
  if (err)
    return console.error(err);

  console.log('info is: ', info);

  // New query with tasks getting
  connection.query('select * from todos;', function (err, rows) {
    if (err)
      console.error(err);

    console.log('rows is: ', rows);
  });
});

// Get all tasks
connection.query('select * from todos;', function (err, rows) {
  if (err)
    return console.error(err);

  console.log('rows is: ', rows);
});

// End connection when all queries will be resolved
connection.end();
