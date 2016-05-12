// Example of task module interface
var connect = require('./pool-server.js');

var todoList = {
  // Getting all tasks
  list: function (callback) {
    connect.getTasks(function(err, rows) {
      if (err)
        return console.error(err);

      console.log('rows: ' , rows);
    });
  },

  // Add task to collection
  add: function (text, callback) {
    // TODO
  },

  // Change task description
  change: function (id, newText, callback) {
    // TODO
  },

  // Mark task as resolved
  complete: function (id, callback) {
    // TODO
  },

  // Delete task
  delete: function (id, callback) {
    // TODO
  },
}

todoList.list();
