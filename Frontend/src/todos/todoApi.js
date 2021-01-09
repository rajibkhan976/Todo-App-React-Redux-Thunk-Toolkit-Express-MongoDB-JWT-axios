import { apiClient } from './apiClient';

export function getTodos() {
    return apiClient.get(`/todos`);
}

export function getTodoById(id) {
    return apiClient.get(`/todo/${id}`);
}

export function addToDo(title) {
    return apiClient.post(`/todo`, { title });
}

export function updateTodoById(id, title) {
    return apiClient.patch(`/todo/${id}`, { title });
}

export function deleteTodoById(id) {
    return apiClient.delete(`/todo/${id}`);
}