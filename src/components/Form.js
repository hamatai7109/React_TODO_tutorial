import React, { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  // App.jsからpropsとして受け取った「addTask」を発動し、その結果を更にApp.jsに返す（子 → 親 へとデータを返す方法）
  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      props.addTask(name);
      setName("");
    } else {
      alert("値を入力してください");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
