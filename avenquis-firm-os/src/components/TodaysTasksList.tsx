import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { TaskItem } from '../types';

interface TodaysTasksListProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onViewAllClick?: () => void;
  onAddTaskClick?: () => void;
}

export const TodaysTasksList: React.FC<TodaysTasksListProps> = ({
  tasks,
  onToggleTask,
  onViewAllClick,
}) => {
  const getPriorityBadge = (priority: TaskItem['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-[#FEE2E2] text-[#DC2626]';
      case 'Medium':
        return 'bg-[#FEF3C7] text-[#D97706]';
      case 'Low':
        return 'bg-[#E0F2FE] text-[#0284C7]';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Today's tasks
        </h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#0B332A] hover:text-[#061F18] flex items-center gap-1 group cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Task Items List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border border-transparent hover:border-neutral-200/70 hover:bg-neutral-50/70 transition-all cursor-pointer select-none group ${
              task.completed ? 'opacity-50 bg-neutral-50/50' : ''
            }`}
          >
            {/* Left: Checkbox & Text */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Checkbox Box */}
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                  task.completed
                    ? 'bg-[#0D7A6F] border-[#0D7A6F] text-white'
                    : 'border-neutral-300 group-hover:border-[#0D7A6F] bg-white'
                }`}
              >
                {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              {/* Title & Client */}
              <div className="min-w-0">
                <div
                  className={`text-xs font-semibold truncate leading-tight ${
                    task.completed
                      ? 'line-through text-neutral-400'
                      : 'text-neutral-900 group-hover:text-[#0D7A6F] transition-colors'
                  }`}
                >
                  {task.title}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {task.client}
                </div>
              </div>
            </div>

            {/* Right: Priority & Due Date/Time */}
            <div className="flex items-center gap-3 shrink-0 text-right">
              {/* Priority Badge */}
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${getPriorityBadge(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>

              {/* Due Date */}
              <span
                className={`text-[11px] font-medium min-w-[70px] text-right ${
                  task.isUrgent ? 'text-[#DC2626] font-semibold' : 'text-neutral-500'
                }`}
              >
                {task.dueText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
