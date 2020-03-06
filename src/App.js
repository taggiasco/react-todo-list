import React from 'react';
import './App.css';

class TaskCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colspan="2">
          {category}
        </th>
      </tr>
    );
  }
}


class TaskRow extends React.Component {
  render() {
    const task = this.props.task;
    const className = task.finished ? "finished-tasks" : "finished-pending";

    return (
      <tr class={className}>
        <td>{task.name}</td>
        <td>{task.deadline}</td>
      </tr>
    );
  }
}


class TaskTable extends React.Component {
  render() {
    const filterText = this.props.filterText.toLowerCase();
    const showFinishedTasks = this.props.showFinishedTasks;

    const rows = [];
    let lastCategory = null;

    this.props.tasks.forEach((task) => {
      if (task.name.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      if (!showFinishedTasks && task.finished) {
        return;
      }
      if (task.category !== lastCategory) {
        rows.push(
          <TaskCategoryRow
            category={task.category}
            key={task.category} />
        );
      }
      rows.push(
        <TaskRow
          task={task}
          key={task.name}
        />
      );
      lastCategory = task.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleShowFinishedTasksChange = this.handleShowFinishedTasksChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleShowFinishedTasksChange(e) {
    this.props.onShowFinishedTasksChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.showFinishedTasks}
            onChange={this.handleShowFinishedTasksChange}
          />
          {' '}
          Show finished tasks
        </p>
      </form>
    );
  }
}


class FilterableTaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      showFinishedTasks: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleShowFinishedTasksChange = this.handleShowFinishedTasksChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleShowFinishedTasksChange(value) {
    this.setState({
      showFinishedTasks: value
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          showFinishedTasks={this.state.showFinishedTasks}
          onFilterTextChange={this.handleFilterTextChange}
          onShowFinishedTasksChange={this.handleShowFinishedTasksChange}
        />
        <TaskTable
          tasks={this.props.tasks}
          filterText={this.state.filterText}
          showFinishedTasks={this.state.showFinishedTasks}
        />
      </div>
    );
  }
}


const TASKS = [
  {category: 'Personal', deadline: '2020/03/06', finished: false, name: 'Buy food'},
  {category: 'Personal', deadline: '2020/02/29', finished: true, name: 'Go dancing'},
  {category: 'Personal', deadline: '', finished: false, name: 'Run'},
  {category: 'Work', deadline: '2020/03/31', finished: false, name: 'Write doc'},
  {category: 'Work', deadline: '2021/01/01', finished: false, name: 'Checking bugs'},
  {category: 'Work', deadline: '2020/03/05', finished: true, name: 'Discuss'}
];



function App() {
  return (
    <div className="App">
      <FilterableTaskTable tasks={TASKS} />
    </div>
  );
}

export default App;
