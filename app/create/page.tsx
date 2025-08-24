/** @format */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateTaskRequest } from '@/types/task';
import { taskApi } from '@/lib/api';
import TaskForm from '@/components/TaskForm';

export default function CreateTaskPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (taskData: CreateTaskRequest) => {
		try {
			setIsLoading(true);
			await taskApi.createTask(taskData);
			router.push('/');
		} catch (error) {
			console.error('Failed to create task:', error);
			alert('Failed to create task. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		router.push('/');
	};

	return (
		<div className="min-h-screen bg-gray-900 py-8">
			<div className="max-w-4xl mx-auto px-4">
				{/* Page Header */}
				<div className="page-header">Added Task</div>

				{/* App Title with Rocket Icon */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
						</svg>
						<h1 className="app-title">Todo App</h1>
					</div>

					{/* Back Button */}
					<button
						onClick={handleCancel}
						className="inline-flex items-center text-gray-400 hover:text-gray-300 mb-4"
					>
						<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>

				{/* Task Form */}
				<TaskForm
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
