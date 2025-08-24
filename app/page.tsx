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

  const handleTaskUpdate = (updatedTask: Task) =>
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));

  const handleTaskDelete = (taskId: string) =>
    setTasks(prev => prev.filter(t => t.id !== taskId));

  const handleTaskClick = (t: Task) => router.push(`/edit/${t.id}`);
  const handleCreateTask = () => router.push('/create');

  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  // >>> NEW: keep completed tasks at the end (stable within each group)
  const orderedTasks = React.useMemo(() => {
    const pending = tasks.filter(t => !t.completed);
    const done = tasks.filter(t => t.completed);
    return [...pending, ...done];
  }, [tasks]);
  // <<<

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-gray-400">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Top black band */}
      <div className="relative bg-black">
        <div className="mx-auto max-w-4xl px-4 pt-12 pb-12">
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

        {/* Overlapping button: matches card width (same max-w + padding) */}
        <div className="absolute left-0 right-0 bottom-[-28px]">
          <div className="mx-auto max-w-4xl px-4">
            <button
              onClick={handleCreateTask}
              className="inline-flex w-full items-center justify-center rounded-lg
                         bg-blue-600 px-6 py-3.5 text-base font-semibold text-white
                         shadow-xl shadow-blue-900/30 transition hover:bg-blue-500"
            >
              <span>Create Task</span>
              <span
                className="ml-3 inline-flex h-5 w-5 items-center justify-center
                           rounded-full border border-white/60"
                aria-hidden
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Gray content to page bottom */}
      <div className="pt-16">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Header row colors as in mock */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sky-400">Tasks</span>
              <span className="inline-flex items-center rounded-full border border-gray-600 bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-200">
                {total}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-indigo-300">Completed</span>
              <span className="inline-flex items-center rounded-full border border-gray-600 bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-200">
                {completed} of {total}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-700 bg-red-900/20 p-4">
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-300">{error}</span>
              </div>
              <button onClick={loadTasks} className="mt-2 text-sm underline text-red-400 hover:text-red-300">
                Try again
              </button>
            </div>
          )}

          {/* Task list */}
          <div className="space-y-3">
            {orderedTasks.length === 0 ? (
              <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-10 text-center">
                <div className="mx-auto mb-4 h-10 w-10 text-gray-500">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mb-1 font-medium text-gray-200">You don&apos;t have any tasks registered yet.</h3>
                <p className="text-sm text-gray-400">Create tasks and organize your to-do items.</p>
              </div>
            ) : (
              orderedTasks.map(task => (
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
    </div>
  );
}
