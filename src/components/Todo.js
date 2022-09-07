import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../features/todos/todoSlice";
import "./todo.css";

const Todo = () => {
	const [inputValue, setInputValue] = useState("");
	const [temp, setTemp] = useState("");
	const [tempID, setTempID] = useState(999);
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todo.todos);

	const addButton = (e) => {
		e.preventDefault();
		if (inputValue !== "") {
			if (todos[0] === undefined) {
				let temp = { id: 1, todo: inputValue };
				dispatch(addTodo(temp));
			} else {
				let temp = { id: todos[todos.length - 1].id + 1, todo: inputValue };
				dispatch(addTodo(temp));
			}
			setInputValue("");
		}
	};

	const delTodo = (id) => {
		dispatch(delTodo(id));
	};

	const editButton = (value, id) => {
		setTemp(value);
		setTempID(id);
	};

	const updateButton = (e) => {
		e.preventDefault();
		if (temp !== "" && tempID !== 999) {
			let tmp = { id: tempID, todo: temp };
			dispatch(updateTodo(tmp));
		}
		setTemp("");
		setTempID(999);
	};

	return (
		<div className="container">
			<form className="input-container">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="things todo"
				/>
				<button type="submit" onClick={addButton}>
					Add Todo
				</button>
			</form>
			<form className="input-container">
				<input type="text" value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="Update Todo" />
				<button type="submit" onClick={updateButton}>
					Update Todo
				</button>
			</form>
			<ul className="todos">
				{todos.map((thing) => {
					return (
						<li key={thing.id}>
							<input className="todos-input" value={thing.todo} type="text" disabled />
							<button onClick={() => editButton(thing.todo, thing.id)}>Edit</button>
							<button onClick={() => dispatch(deleteTodo(thing.id))} style={{ marginLeft: "5px" }}>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Todo;
