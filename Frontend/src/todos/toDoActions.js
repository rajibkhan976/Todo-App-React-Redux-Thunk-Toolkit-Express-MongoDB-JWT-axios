import * as Api from './todoApi';

export function getTodos() {
	return function (dispatch) {
		return Api.getTodos()
		.then((result) => {
			return dispatch({
				type: 'GET_TODOS',
				data: result.data.todos
			});
		})
		.catch((error) => {
			return dispatch({
				type: 'GET_TODOS_FAILED',
				data: `Fetching todos failed due to ${error}`
			})
		})
	}
}

export function getTodoById(id) {
	return function (dispatch) {
		return Api.getTodoById(id)
		.then((result) => {
			return dispatch({
				type: 'GET_TODO_BY_ID',
				data: result.data
			})
		})
		.catch((error) => {
			return dispatch({
				type: 'GET_TODO_BY_ID_FAILED',
				data: `Fetching todo by id failed due to ${error}`
			})
		})
	}
}

export function addToDo(title) {
	return function (dispatch) {
		return Api.addToDo(title)
		.then((result) => {
			return dispatch({
				type: 'ADD_TODO',
				data: result.data
			})
		})
		.catch((error) => {
			return dispatch({
				type: 'ADD_TODO_FAILED',
				data: `Adding todo failed due to ${error}`
			})
		})
	}
}

export function updateTodoById(id, title) {
	return function (dispatch) {
		return Api.updateTodoById(id, title)
		.then((result) => {
			return dispatch({
				type: 'UPDATE_TODO_BY_ID',
				data: result.data
			})
		})
		.catch((error) => {
			return dispatch({
				type: 'UPDATE_TODO_BY_ID_FAILED',
				data: `Upadet todo by id failed due to ${error}`
			})
		})
	}
}

export function deleteTodoById(id) {
	return function (dispatch) {
		return Api.deleteTodoById(id)
		.then((result) => {
			return dispatch({
				type: 'DELETE_TODO_BY_ID',
				data: result.data
			})
		})
		.catch((error) => {
			return dispatch({
				type: 'DELETE_TODO_BY_ID_FAILED',
				data: `Delete todo by id failed due to ${error}`
			})
		})
	}
}

export function messageCleanup() {
	return function (dispatch) {
		return dispatch({
			type: 'MESSAGE_CLEAN_UP',
			data: null
		})
	}
}