/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task, UpdateTaskRequest } from '@/types/task';
import { taskApi } from '@/lib/api';
import TaskForm from '@/components/TaskForm';

export default function EditTaskPage() {
	const router = useRouter();
	const params = useParams();
	const taskId = params.id as string;

	const [task, setTask] = useState<Task | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (taskId) {
			loadTask();
		}
	}, [taskId]);

	const loadTask = async () => {
		try {
			setIsLoading(true);
			setError(null);

			// Get all tasks and find the one we need
			const allTasks = await taskApi.getAllTasks();
			const foundTask = allTasks.find((t) => t.id === taskId);

			if (!foundTask) {
				setError('Task not found');
				return;
			}

			setTask(foundTask);
		} catch (err) {
			setError('Failed to load task. Please try again.');
			console.error('Error loading task:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (taskData: UpdateTaskRequest) => {
		try {
			setIsSubmitting(true);
			await taskApi.updateTask(taskId, taskData);
			router.push('/');
		} catch (error) {
			console.error('Failed to update task:', error);
			alert('Failed to update task. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		router.push('/');
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 py-8'>
				<div className='max-w-4xl mx-auto px-4'>
					<div className='text-center'>
						<div className='w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
						<p className='text-gray-600'>Loading task...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !task) {
		return (
			<div className='min-h-screen bg-gray-50 py-8'>
				<div className='max-w-4xl mx-auto px-4'>
					<div className='card text-center py-12'>
						<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
							<svg
								className='w-8 h-8 text-red-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
								/>
							</svg>
						</div>
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							{error || 'Task not found'}
						</h3>
						<p className='text-gray-600 mb-4'>
							The task you're looking for doesn't exist or couldn't be loaded.
						</p>
						<button
							onClick={handleCancel}
							className='btn-primary'>
							Back to Tasks
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='max-w-4xl mx-auto px-4'>
				{/* Header */}
				<div className='text-center mb-8'>
					<button
						onClick={handleCancel}
						className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-4'>
						<svg
							className='w-5 h-5 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
						Back to Tasks
					</button>
					<h1 className='text-3xl font-bold text-gray-900'>Edit Task</h1>
				</div>

				{/* Task Form */}
				<TaskForm
					task={task}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isLoading={isSubmitting}
				/>
			</div>
		</div>
	);
}
