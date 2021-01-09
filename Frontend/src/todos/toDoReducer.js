import { combineReducers } from 'redux';

const initialState = {
  todos: []
}

const toDoReducer = (state = initialState, action) => {
	
	switch (action.type) {

		case 'GET_TODOS':

		return { ...state, todos: action.data };
		
		case 'ADD_TODO':
		
		return { 
			...state, 
			token: action.data.token, 
			message: action.data.message 
		};
			
		case 'UPDATE_TODO_BY_ID':
		
		return { ...state, message: action.data.message };
		
		case 'DELETE_TODO_BY_ID':
		
		return {  ...state,  message: action.data.message };

		case 'MESSAGE_CLEAN_UP':

		return {  ...state,  message: action.data };
		
		default:
		
		return state;
	}
}

export default combineReducers({ toDoReducer });