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

export type TaskColor =
	| 'red'
	| 'orange'
	| 'amber'
	| 'green'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'pink'
	| 'stone';

export const TASK_COLORS: {
	value: TaskColor;
	label: string;
	bgColor: string;
}[] = [
	{ value: 'red', label: 'Red', bgColor: 'bg-task-red' },
	{ value: 'orange', label: 'Orange', bgColor: 'bg-task-orange' },
	{ value: 'amber', label: 'Amber', bgColor: 'bg-task-amber' },
	{ value: 'green', label: 'Green', bgColor: 'bg-task-green' },
	{ value: 'blue', label: 'Blue', bgColor: 'bg-task-blue' },
	{ value: 'indigo', label: 'Indigo', bgColor: 'bg-task-indigo' },
	{ value: 'violet', label: 'Violet', bgColor: 'bg-task-violet' },
	{ value: 'pink', label: 'Pink', bgColor: 'bg-task-pink' },
	{ value: 'stone', label: 'Stone', bgColor: 'bg-task-stone' },
];
