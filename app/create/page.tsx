/** @format */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateTaskRequest } from '@/types/task';
import { taskApi } from '@/lib/api';
import CreateTaskForm from '@/components/CreateTaskForm';

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

  const handleCancel = () => router.push('/');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Black header with title */}
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

      {/* Body: keep the same max width as your list/cards, but form is narrower (like the mock) */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Back arrow aligned with the form left edge */}
        <button
          onClick={handleCancel}
          aria-label="Back"
          className="mb-6 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Your form */}
        <CreateTaskForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
      </div>
    </div>
  );
}
