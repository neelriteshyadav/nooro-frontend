/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task, UpdateTaskRequest } from '@/types/task';
import { taskApi } from '@/lib/api';
import EditTaskForm from '@/components/EditTaskForm';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskId) void loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allTasks = await taskApi.getAllTasks();
      const foundTask = allTasks.find((t) => t.id === taskId);
      if (!foundTask) {
        setError('Task not found');
        return;
      }
      setTask(foundTask);
    } catch (err) {
      console.error('Error loading task:', err);
      setError('Failed to load task. Please try again.');
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

  const handleCancel = () => router.push('/');

  const Header = () => (
    <div className="bg-black">
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-10">
        <div className="text-center">
          <div className="mb-6 flex items-center justify-center space-x-3">
            <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h1 className="text-5xl font-semibold tracking-tight">
              <span className="text-blue-400">Todo</span>
              <span className="text-purple-500"> App</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="mx-auto max-w-2xl px-4 py-10 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-gray-400">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="mx-auto max-w-2xl px-4 py-10">
          <button
            onClick={handleCancel}
            aria-label="Back"
            className="mb-6 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-10 text-center">
            <div className="mx-auto mb-4 h-10 w-10 text-gray-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium text-gray-200">{error || 'Task not found'}</h3>
            <p className="text-sm text-gray-400">
              The task you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
            </p>
            <button
              onClick={handleCancel}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Form area: arrow and form share the same container */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        <button
          onClick={handleCancel}
          aria-label="Back"
          className="mb-6 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <EditTaskForm
          task={task}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
