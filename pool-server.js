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
    return console.error(err);

  // Получение всех задач
  connection.query('select * from todos;', function (err, rows) {
    if (err)
      return console.error(err);

    console.log('rows is: ', rows);

    // Отправка соединения обратно в пул
    connection.release();
  });
});

// Внешний метод для использования
function getTasks(callback) {
  connectionPool.getConnection(function (err, connection) {
    if (err)
      console.error(err);

    connection.query('select * from todos;', callback);
    connection.end(); // Используем метод end,
                      // чтобы не залезать внутрь callback-функции
  });
}

// Экспорт метода для использования
module.exports.getTasks = getTasks;
