// Одиночное соединение с базой данных
var mysql = require('mysql');

// Настройка соединения
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  pass: '',
});

// Установка соединения
connection.connect(function (err) {
  if (err)
    throw err;
});

// Получение всех задач
connection.query('select * from todos;', function (err, rows) {
  if (err)
    throw err;

  console.log('rows is: ', rows);
});

// Добавление задачи и получение всех задач
connection.query('insert into todos (text, completed) values ("my big task", "false");', function (err, info) {
  if (err)
    throw err;

  console.log('info is: ', info);

  // Запрос с получением задач
  connection.query('select * from todos;', function (err, rows) {
    if (err)
      throw err;

    console.log('rows is: ', rows);

    connection.end();
  });
});

// Закрытие соединения после выполнения всех задач
connection.end();
