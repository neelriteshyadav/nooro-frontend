/** @format */

'use client';

import React from 'react';
import { Task, TASK_COLORS } from '@/types/task';
import { taskApi } from '@/lib/api';

interface TaskCardProps {
	task: Task;
	onUpdate: (updatedTask: Task) => void;
	onDelete: (taskId: string) => void;
	onClick: () => void;
}

export default function TaskCard({
	task,
	onUpdate,
	onDelete,
	onClick,
}: TaskCardProps) {
	const colorConfig = TASK_COLORS.find((c) => c.value === task.color) || TASK_COLORS[4]; // Default to blue

	const handleToggleCompletion = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			const updatedTask = await taskApi.toggleTaskCompletion(task.id);
			onUpdate(updatedTask);
		} catch (error) {
			console.error('Failed to toggle task completion:', error);
		}
	};

	const handleDelete = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (window.confirm('Are you sure you want to delete this task?')) {
			try {
				await taskApi.deleteTask(task.id);
				onDelete(task.id);
			} catch (error) {
				console.error('Failed to delete task:', error);
			}
		}
	};

	return (
		<div
			className={`task-card group cursor-pointer ${
				task.completed ? 'opacity-75' : ''
			}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 flex-1 min-w-0">
					{/* Toggle completion checkbox */}
					<button
						onClick={handleToggleCompletion}
						className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
							task.completed
								? 'bg-purple-500 border-purple-500 text-white'
								: 'border-blue-500 hover:border-blue-400'
						}`}
						title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
					>
						{task.completed && (
							<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						)}
					</button>

					{/* Task content */}
					<div className="flex-1 min-w-0">
						<h3
							className={`font-medium text-white ${
								task.completed ? 'line-through text-gray-400' : ''
							}`}
						>
							{task.title}
						</h3>
					</div>
				</div>

				{/* Delete button */}
				<button
					onClick={handleDelete}
					className={`opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-400 ${
						task.completed ? 'opacity-50' : ''
					}`}
					title="Delete task"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
