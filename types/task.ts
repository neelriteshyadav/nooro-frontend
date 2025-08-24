/** @format */

export interface Task {
	id: string;
	title: string;
	color: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTaskRequest {
	title: string;
	color: string;
}

export interface UpdateTaskRequest {
	title?: string;
	color?: string;
	completed?: boolean;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export type TaskColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'brown';

export const TASK_COLORS: {
	value: TaskColor;
	label: string;
	bgColor: string;
}[] = [
	{ value: 'red', label: 'Red', bgColor: 'bg-task-red' },
	{ value: 'orange', label: 'Orange', bgColor: 'bg-task-orange' },
	{ value: 'yellow', label: 'Yellow', bgColor: 'bg-task-yellow' },
	{ value: 'green', label: 'Green', bgColor: 'bg-task-green' },
	{ value: 'blue', label: 'Blue', bgColor: 'bg-task-blue' },
	{ value: 'purple', label: 'Purple', bgColor: 'bg-task-purple' },
	{ value: 'pink', label: 'Pink', bgColor: 'bg-task-pink' },
	{ value: 'brown', label: 'Brown', bgColor: 'bg-task-brown' },
];
