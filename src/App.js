import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid, nanoids } from "nanoid";
import React, { useState } from "react";

//App関数の外でフィルターを定義することで、レンダリングの影響を受けなくする。
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // tasksの内容を保持する。初期値はindex.jsから受け取ったDATAの値。
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  // チェックボタンの切り替えを保持
  function toggleTaskCompleted(id) {
    const updateTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTasks);
  }

  // タスク編集機能
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // タスク削除機能
  // Todo.js内で呼び出されたタスクのid「以外」の要素だけで、新しい配列「remainingTasks」を作成している。
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // index.jsで定義した「DATA」をpropsとして受け取り、map関数を用いて一覧表示している。その際に、Todoコンポーネントへ各項目をpropsとして渡している。
  // DATA(index.js) → taskList(App.js) → id,name,completed(Todo.js) : 親コンポーネントから子へと一方向の流れ
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} //You should always pass a unique key to anything you render with iteration
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  // タスクのフィルター機能
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //taskの数によって、単数形と複数形の表示を変える。
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // タスクの追加機能
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
