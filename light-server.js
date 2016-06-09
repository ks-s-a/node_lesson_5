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
    return console.error(err);
});

// Добавление задачи и получение всех задач
connection.query('insert into todos (text, completed) values ("pretty task", "true");', function (err, info) {
  if (err)
    return console.error(err);

  console.log('info is: ', info);

  // Запрос с получением задач
  connection.query('select * from todos;', function (err, rows) {
    if (err)
      console.error(err);

    console.log('rows is: ', rows);
  });
});

// Получение всех задач
connection.query('select * from todos;', function (err, rows) {
  if (err)
    return console.error(err);

  console.log('rows is: ', rows);
});

// Закрытие соединения после выполнения всех задач
connection.end();
