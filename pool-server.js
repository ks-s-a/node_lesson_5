// Использование пула соединений
var mysql = require('mysql');

// Настройка пула соединения
var connectionPool = mysql.createPool({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

// Получение соединения из пула
connectionPool.getConnection(function (err, connection) {
  if (err)
    throw err;

  // Получение всех задач
  connection.query('select * from todos;', function (err, rows) {
    if (err)
      throw err;

    console.log('rows is: ', rows);

    // Отправка соединения обратно в пул
    connection.release();
  });
});

// Внешний метод для использования
function getTasks(callback) {
  connectionPool.getConnection(function (err, connection) {
    if (err)
      throw err;

    connection.query('select * from todos;', callback);
    connection.release();
  });
}

// Экспорт метода для использования
module.exports.getTasks = getTasks;
