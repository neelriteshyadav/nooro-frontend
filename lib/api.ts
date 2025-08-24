/** @format */

import axios from 'axios';
import {
	Task,
	CreateTaskRequest,
	UpdateTaskRequest,
	ApiResponse,
} from '@/types/task';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add request interceptor for logging
api.interceptors.request.use(
	(config) => {
		if (process.env.NODE_ENV === 'development') {
			console.log(
				`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
			);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Add response interceptor for error handling
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (process.env.NODE_ENV === 'development') {
			console.error('❌ API Error:', error.response?.data || error.message);
		}
		return Promise.reject(error);
	},
);

export const taskApi = {
	// Get all tasks
	async getAllTasks(): Promise<Task[]> {
		const response = await api.get<ApiResponse<Task[]>>('/tasks');
		return response.data.data || [];
	},

	// Create a new task
	async createTask(taskData: CreateTaskRequest): Promise<Task> {
		const response = await api.post<ApiResponse<Task>>('/tasks', taskData);
		if (!response.data.success || !response.data.data) {
			throw new Error(response.data.error || 'Failed to create task');
		}
		return response.data.data;
	},

	// Update a task
	async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
		const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, taskData);
		if (!response.data.success || !response.data.data) {
			throw new Error(response.data.error || 'Failed to update task');
		}
		return response.data.data;
	},

	// Delete a task
	async deleteTask(id: string): Promise<void> {
		const response = await api.delete<ApiResponse<void>>(`/tasks/${id}`);
		if (!response.data.success) {
			throw new Error(response.data.error || 'Failed to delete task');
		}
	},

	// Toggle task completion
	async toggleTaskCompletion(id: string): Promise<Task> {
		const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`);
		if (!response.data.success || !response.data.data) {
			throw new Error(
				response.data.error || 'Failed to toggle task completion',
			);
		}
		return response.data.data;
	},
};

export default api;
