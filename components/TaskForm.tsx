/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import {
	Task,
	CreateTaskRequest,
	UpdateTaskRequest,
	TASK_COLORS,
} from '@/types/task';

interface TaskFormProps {
	task?: Task;
	onSubmit: (taskData: CreateTaskRequest | UpdateTaskRequest) => void;
	onCancel: () => void;
	isLoading?: boolean;
}

export default function TaskForm({
	task,
	onSubmit,
	onCancel,
	isLoading = false,
}: TaskFormProps) {
	const [title, setTitle] = useState(task?.title || '');
	const [color, setColor] = useState(task?.color || 'blue');
	const [errors, setErrors] = useState<{ title?: string }>({});

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setColor(task.color);
		}
	}, [task]);

	const validateForm = () => {
		const newErrors: { title?: string } = {};

		if (!title.trim()) {
			newErrors.title = 'Title is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const taskData = {
			title: title.trim(),
			color,
		};

		onSubmit(taskData);
	};

	const handleCancel = () => {
		if (title.trim() !== (task?.title || '')) {
			if (window.confirm('Are you sure you want to discard your changes?')) {
				onCancel();
			}
		} else {
			onCancel();
		}
	};

	return (
		<div className='max-w-md mx-auto'>
			<form
				onSubmit={handleSubmit}
				className='space-y-6'>
				{/* Title Field */}
				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-blue-400 mb-2'>
						Title
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={`input ${
							errors.title ? 'border-red-500 focus:ring-red-500' : ''
						}`}
						placeholder='Ex. Brush you teeth'
						disabled={isLoading}
					/>
					{errors.title && (
						<p className='text-red-400 text-sm mt-1'>{errors.title}</p>
					)}
				</div>

				{/* Color Selection */}
				<div>
					<label className='block text-sm font-medium text-blue-400 mb-2'>
						Color
					</label>
					<div className='flex space-x-3'>
						{TASK_COLORS.map((colorOption) => (
							<button
								key={colorOption.value}
								type='button'
								onClick={() => setColor(colorOption.value)}
								className={`color-swatch ${colorOption.bgColor} ${
									color === colorOption.value ? 'selected' : ''
								}`}
								disabled={isLoading}
							/>
						))}
					</div>
				</div>

				{/* Form Actions */}
				<div className='pt-4'>
					<button
						type='submit'
						className='btn-primary w-full flex items-center justify-center space-x-2'
						disabled={isLoading || !title.trim()}>
						{isLoading ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
								{task ? 'Updating...' : 'Creating...'}
							</>
						) : (
							<>
								<span>{task ? 'Save' : 'Add Task'}</span>
								{task ? (
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
								) : (
									<div className='w-5 h-5 bg-white rounded-full flex items-center justify-center'>
										<svg
											className='w-3 h-3 text-blue-500'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 4v16m8-8H4'
											/>
										</svg>
									</div>
								)}
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
