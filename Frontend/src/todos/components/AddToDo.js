import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as toDoActions from "../toDoActions";
import ToDoList from "./ToDoList";

const AddToDo = ({ todos, token, toDoActions }) => {

  const [toDo, setToDo] = useState('');
  
  const handleChange = (event) => {
	  setToDo(event.target.value);
  }
  
  const handleKeyDown = (event) => {
	  if (event.key === 'Enter' && todos) {
		if (todos.length !== 0) {
			todos.forEach((element, index) => {
				if (element.title !== toDo.trim()) {
					toDoActions.messageCleanup();
					toDoActions.addToDo(toDo.trim());
				}
			});
		} else {
			toDoActions.messageCleanup();
			toDoActions.addToDo(toDo.trim());
		}
	  }
  }

  useEffect(() => {
	  if (token) {
		sessionStorage.setItem('token', token);
	  }
  }, [token]);
  
  return (
    <div className="container">
		<div className="jumbotron mt-5">
			<h1 className="display-4">todos!</h1>
			<p className="lead">This is a simple React todo application supported by Redux.</p>
			<hr className="my-4" />
			<div className="row mt-5">
				<div className="col-8 ml-5">
					<input 
						type="text"
						className="form-control" 
						value={toDo}
						onChange={handleChange} 
						onKeyDown={handleKeyDown}
						placeholder="Add ToDo" 
						aria-label="ToDo" 
					/>
				</div>
			</div>
			<ToDoList />
		</div>
	</div>
  );
}

AddToDo.propTypes = {
	todos: PropTypes.array
};

const mapStateToProps = (state) => ({
  todos: state.toDoReducer.todos,
  token: state.toDoReducer.token
})

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators(toDoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo);