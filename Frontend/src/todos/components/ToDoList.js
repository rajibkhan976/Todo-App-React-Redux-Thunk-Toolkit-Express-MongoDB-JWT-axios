import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as toDoActions from "../toDoActions";
import UpdateToDo from "./UpdateToDo";

const ToDoList = ({ todos, message, toDoActions }) => {
	
  const [selectedTodoId, setSelectedTodoId] = useState([]);
  
  useEffect(() => {
	toDoActions.getTodos();
  }, []);
  
  const addSelectedTodoId = (event, id) => {
	  event.stopPropagation();
	  let selectedId = [];
	  selectedId.push(id);
	  setSelectedTodoId(selectedId);
  }
  
  const removeSelectedTodoId = () => {
	selectedTodoId.pop();
  }

  const removeTodo = (event, id) => {
	toDoActions.messageCleanup();
	toDoActions.deleteTodoById(id);
  }

  useEffect(() => {
	if (message && message === "Creation successful") {
		toDoActions.getTodos();
	}
  }, [message]);

  useEffect(() => {
	if (message && message === "Update successful") {
		toDoActions.getTodos();
	}
  }, [message]);

  useEffect(() => {
	if (message && message === "Deletion successful") {
		toDoActions.getTodos();
	}
  }, [message]);
  
  return (
    <div className="row">
		<div className="col-8 ml-5">
			<ul className="list-group">
				{todos && todos.map((element, index) => {
					return <div key={index}>
								<li className="list-group-item">
								{(selectedTodoId && selectedTodoId.includes(element._id)) ?
								<UpdateToDo 
								selectedTodoId={selectedTodoId}
								selectedToDoItem={element.title}
								removeSelectedTodoId={removeSelectedTodoId}
								/>
								:
								<React.Fragment>
									<div 
									className="d-inline-block w-75 ml-4"
									onClick={(event) => addSelectedTodoId(event, element._id)} 
									>
									{element.title}
									</div>
									<button 
									type="button" 
									className="close d-inline-block" 
									aria-label="Close"
									onClick={(event) => removeTodo(event, element._id)}
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</React.Fragment>
								}
								</li>
						   	</div>
				})}
		   </ul>
		</div>
	</div>
  );
}

ToDoList.propTypes = {
	todos: PropTypes.array
};

const mapStateToProps = (state) => ({
  todos: state.toDoReducer.todos,
  message: state.toDoReducer.message
})

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators(toDoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);