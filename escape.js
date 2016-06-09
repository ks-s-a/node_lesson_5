// Аспекты безопасности
var mysql = require('mysql');

// Попробуем сломать запрос
var todoId = '7 OR 1 = 1';

// Создание пула запросов
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

  // Обработка параметров через mysql.escape
  var query = _getEscapedQuery(todoId);

  // Обработка параметров через mysql.format
  var query = _getFormattedQuery(todoId);

  // Выполнение запроса
  connection.query(query, function (err, rows) {
    console.log('rows is: ', rows);

    connection.release();
  });

  // Использование массива для замены в запросе
  connection.query('select * from todos where id = ?;', [todoId], function (err, rows) {
    if (err)
      return console.error(err);

    console.log('rows is: ', rows);

    connection.release();
  });

  // Объект с данными для запроса
  var newData = {
    text: 'new text',
    completed: 'true',
  };

  // Использование объекта для множественной подстановки в запрос
  connection.query('update todos set ? where id = ?;', [newData, todoId], function (err, rows) {
    if (err)
      console.error(err);

    console.log('rows is: ', rows);

    connection.release()
  });
});

// Метод с mysql.escape
function _getEscapedQuery(todoId) {
  var todoIdEscaped = mysql.escape(todoId);
  
  return 'select * from todos where id = '+ todoIdEscaped +';';
}

// Метод с mysql.format
function _getFormattedQuery(todoId) {
  var query = 'select * from ?? where ?? = ?;';

  return mysql.format(query, ['todos', 'id', todoId]);
}
