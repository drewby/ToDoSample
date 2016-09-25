var data = [
  { id: 1, description: "This is one todo" },
  { id: 2, description: "This is *another* todo" }
];

var ToDoItem = React.createClass({
    render: function () {
        return(
            <div className="todo">
                {this.props.id} 
                {this.props.children}
            </div>
        );
    }
});

var ToDoList = React.createClass({
    render: function () {
        var todoNodes = this.props.data.map(function (todo) {
            return (
                <ToDoItem id={todo.id}>{todo.description}</ToDoItem>    
            );
        });
        return (
          <div className="todoList">
            {todoNodes}
          </div>
      );
    }
});

var ToDoForm = React.createClass({
    render: function () {
        return (
            <div className="todoForm">
                This is the ToDo Form.
            </div>
        );
    }
})

var ToDo = React.createClass({
    render: function () {
        return (
            <div className="todo">
                <h3>To Do</h3>
                <ToDoList data={this.props.data}/>
                <ToDoForm />
            </div>
        );
    }
})

ReactDOM.render(
  <ToDo data={data} />,
  document.getElementById('content')
);
