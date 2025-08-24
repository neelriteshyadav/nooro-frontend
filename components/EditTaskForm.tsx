/** @format */
import React, { useState } from 'react';
import type { Task, UpdateTaskRequest } from '@/types/task';

const PALETTE = [
  { key: 'red',    cls: 'bg-red-500' },
  { key: 'orange', cls: 'bg-orange-500' },
  { key: 'amber',  cls: 'bg-amber-400' },
  { key: 'green',  cls: 'bg-green-500' },
  { key: 'blue',   cls: 'bg-blue-500' },
  { key: 'indigo', cls: 'bg-indigo-500' },
  { key: 'violet', cls: 'bg-violet-500' },
  { key: 'pink',   cls: 'bg-pink-500' },
  { key: 'stone',  cls: 'bg-stone-500' },
];

type Props = {
  task: Task;
  onSubmit: (data: UpdateTaskRequest) => void | Promise<void>;
  isLoading?: boolean;
};

export default function EditTaskForm({ task, onSubmit, isLoading }: Props) {
  const [title, setTitle] = useState(task.title);
  const [color, setColor] = useState<string>(task.color);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UpdateTaskRequest = { title, color }; // only fields that exist on UpdateTaskRequest
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-sky-400">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Brush you teeth"
          className="w-full rounded-md border border-white/10 bg-gray-800/70 px-4 py-3 text-gray-100
                     placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Color */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-sky-400">Color</label>
        <div className="flex flex-wrap items-center gap-4">
          {PALETTE.map((p) => {
            const selected = color === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setColor(p.key)}
                aria-label={p.key}
                className={[
                  'h-8 w-8 rounded-full border border-white/20',
                  p.cls,
                  selected ? 'ring-2 ring-white' : 'ring-0',
                ].join(' ')}
              />
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="inline-flex flex-1 items-center justify-center rounded-md bg-blue-600 px-6 py-3
                     font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          <span>Save</span>
          <span className="ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/60">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
