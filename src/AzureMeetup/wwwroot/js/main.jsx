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
    handleDescriptionChange: function(e) {
        this.setState({ description: e.target.value });
    },
    handleSubmit: function() {
        e.preventDefault();
        var description = this.state.description.trim();
        if (!description) {
            return;
        }
        this.setState({ description: '' });
    },
    render: function () {
        return (
            <form className="todoForm">
                <input type="text" 
                       placeholder="To Do"  
                       value={this.state.description}
                       onChange={this.handleDescriptionChange}/>
                <input type="submit" value="Post" />
            </form>
        );
    }
})

var ToDo = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="todo">
                <h3>To Do</h3>
                <ToDoList data={this.state.data}/>
                <ToDoForm />
            </div>
        );
    }
})

ReactDOM.render(
  <ToDo url="/api/ToDo" />,
  document.getElementById('content')
);
