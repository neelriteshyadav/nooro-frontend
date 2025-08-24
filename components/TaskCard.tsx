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
	const colorConfig =
		TASK_COLORS.find((c) => c.value === task.color) || TASK_COLORS[4]; // Default to blue

	// Color mapping for Tailwind classes
	const colorMap: Record<string, { completed: string; incomplete: string }> = {
		red: {
			completed: 'bg-red-500 border-red-500 text-white',
			incomplete: 'border-red-400 hover:border-red-300'
		},
		orange: {
			completed: 'bg-orange-500 border-orange-500 text-white',
			incomplete: 'border-orange-400 hover:border-orange-300'
		},
		amber: {
			completed: 'bg-amber-500 border-amber-500 text-white',
			incomplete: 'border-amber-400 hover:border-amber-300'
		},
		green: {
			completed: 'bg-green-500 border-green-500 text-white',
			incomplete: 'border-green-400 hover:border-green-300'
		},
		blue: {
			completed: 'bg-blue-500 border-blue-500 text-white',
			incomplete: 'border-blue-400 hover:border-blue-300'
		},
		indigo: {
			completed: 'bg-indigo-500 border-indigo-500 text-white',
			incomplete: 'border-indigo-400 hover:border-indigo-300'
		},
		violet: {
			completed: 'bg-violet-500 border-violet-500 text-white',
			incomplete: 'border-violet-400 hover:border-violet-300'
		},
		pink: {
			completed: 'bg-pink-500 border-pink-500 text-white',
			incomplete: 'border-pink-400 hover:border-pink-300'
		},
		stone: {
			completed: 'bg-stone-500 border-stone-500 text-white',
			incomplete: 'border-stone-400 hover:border-stone-300'
		}
	};

	const getColorClasses = (isCompleted: boolean) => {
		const colorClasses = colorMap[task.color] || colorMap.blue;
		return isCompleted ? colorClasses.completed : colorClasses.incomplete;
	};

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
			className={`task-card-new group cursor-pointer ${
				task.completed ? 'opacity-75' : ''
			}`}
			onClick={onClick}>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-4 flex-1 min-w-0'>
					{/* Toggle completion checkbox */}
					<button
						onClick={handleToggleCompletion}
						className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${getColorClasses(task.completed)}`}
						title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}>
						{task.completed && (
							<svg
								className='w-3 h-3'
								fill='currentColor'
								viewBox='0 0 20 20'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						)}
					</button>

					{/* Task content */}
					<div className='flex-1 min-w-0'>
						<h3
							className={`font-medium ${
								task.completed ? 'line-through text-gray-400' : 'text-gray-300'
							}`}>
							{task.title}
						</h3>
					</div>
				</div>

				{/* Delete button - always visible */}
				<button
					onClick={handleDelete}
					className='delete-btn p-2 text-gray-400 hover:text-red-400 transition-colors duration-200'
					title='Delete task'>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
