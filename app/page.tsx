/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { taskApi } from '@/lib/api';
import TaskCard from '@/components/TaskCard';

export default function HomePage() {
	const router = useRouter();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const fetchedTasks = await taskApi.getAllTasks();
			setTasks(fetchedTasks);
		} catch (err) {
			setError('Failed to load tasks. Please try again.');
			console.error('Error loading tasks:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleTaskUpdate = (updatedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task,
			),
		);
	};

	const handleTaskDelete = (taskId: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	};

	const handleTaskClick = (task: Task) => {
		router.push(`/edit/${task.id}`);
	};

	const handleCreateTask = () => {
		router.push('/create');
	};

	const completedTasks = tasks.filter((task) => task.completed).length;
	const totalTasks = tasks.length;

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-900 py-8">
				<div className="max-w-4xl mx-auto px-4">
					<div className="text-center">
						<div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
						<p className="text-gray-400">Loading your tasks...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 py-8">
			<div className="max-w-4xl mx-auto px-4">
				{/* Page Header */}
				<div className="page-header">
					{tasks.length === 0 ? 'Todo - Empty' : 'Todo'}
				</div>

				{/* App Title with Rocket Icon */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
						</svg>
						<h1 className="app-title">Todo App</h1>
					</div>

					{/* Create Task Button */}
					<button
						onClick={handleCreateTask}
						className="btn-primary flex items-center space-x-3 mx-auto"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
						</svg>
						<span>Create Task</span>
					</button>
				</div>

				{/* Task Summary */}
				<div className="task-summary">
					<div className="summary-item">
						Tasks: <span className="summary-number">{totalTasks}</span>
					</div>
					<div className="summary-item">
						Completed: <span className="summary-number">{completedTasks} de {totalTasks}</span>
					</div>
				</div>

				{/* Error Display */}
				{error && (
					<div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
						<div className="flex items-center">
							<svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
							<span className="text-red-300">{error}</span>
						</div>
						<button
							onClick={loadTasks}
							className="text-red-400 hover:text-red-300 text-sm underline mt-2"
						>
							Try again
						</button>
					</div>
				)}

				{/* Task List */}
				<div className="space-y-4">
					{tasks.length === 0 ? (
						<div className="empty-state">
							<div className="empty-icon">
								<svg fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
							</div>
							<h3 className="empty-title">You don't have any tasks registered yet.</h3>
							<p className="empty-description">Create tasks and organize your to-do items.</p>
						</div>
					) : (
						tasks.map((task) => (
							<TaskCard
								key={task.id}
								task={task}
								onUpdate={handleTaskUpdate}
								onDelete={handleTaskDelete}
								onClick={() => handleTaskClick(task)}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
