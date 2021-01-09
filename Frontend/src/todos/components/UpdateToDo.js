import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as toDoActions from "../toDoActions";

const UpdateToDo = ({ selectedTodoId, selectedToDoItem, removeSelectedTodoId, todos, toDoActions }) => {
	
  const [selectedToDo, setSelectedToDo ] = useState(selectedToDoItem);
  
  const handleChange = (event) => {
	  setSelectedToDo(event.target.value);
  }
  
  const handleKeyDown = (event) => {
	  if (event.key === 'Enter') {
		  toDoActions.messageCleanup();
		  toDoActions.updateTodoById(selectedTodoId, selectedToDo);
		  removeSelectedTodoId();
	  }
  }
	
  return (
    <div>
		<input 
			type="text"
			className="form-control" 
			value={selectedToDo}
			onChange={(event) => handleChange(event)} 
			onKeyDown={(event) => handleKeyDown(event)}
			placeholder="Update ToDo" 
			aria-label="ToDo" 
		/>
	</div>
  );
}

UpdateToDo.propTypes = {
	todos: PropTypes.array
};

const mapStateToProps = (state) => ({
  todos: state.toDoReducer.todos
})

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators(toDoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (UpdateToDo);