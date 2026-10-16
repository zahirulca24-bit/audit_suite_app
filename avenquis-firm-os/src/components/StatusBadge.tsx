import React from 'react';

export type SemanticStatus =
  // Green: Active, Completed, Final, Success, On Track
  | 'Active'
  | 'Completed'
  | 'Final'
  | 'Success'
  | 'On Track'
  | 'Cleared & Signed'
  | 'Paid'
  | 'Present'
  | 'Approved'
  // Blue: In Progress, Draft, Informational, Current work, Planning
  | 'In Progress'
  | 'Draft'
  | 'Informational'
  | 'Information'
  | 'Current work'
  | 'Planning'
  | 'Submitted'
  // Amber: Pending, Review, In Review, Upcoming, Awaiting response, Partially Paid
  | 'Pending'
  | 'Review'
  | 'In Review'
  | 'Upcoming'
  | 'Awaiting response'
  | 'Awaiting Client'
  | 'Partially Paid'
  | 'Medium'
  // Red: Overdue, Delayed, High Risk, Critical, Error, At Risk
  | 'Overdue'
  | 'Delayed'
  | 'High Risk'
  | 'High'
  | 'Critical'
  | 'Error'
  | 'At Risk'
  | 'Urgent'
  // Purple: Partner Review, Special approval
  | 'Partner Review'
  | 'Special approval'
  | 'EQCR'
  // Gray: Not Started, Dormant, Inactive, Disabled, Low
  | 'Not Started'
  | 'Dormant'
  | 'Inactive'
  | 'Disabled'
  | 'Low'
  | string;

interface StatusBadgeProps {
  status: SemanticStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  const normalized = (status || '').trim().toLowerCase();

  // GREEN
  if (
    [
      'active',
      'completed',
      'final',
      'success',
      'on track',
      'cleared & signed',
      'paid',
      'present',
      'approved',
      'cleared',
    ].includes(normalized)
  ) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border bg-emerald-50 text-emerald-700 border-emerald-200/80 ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } ${className}`}
      >
        {status}
      </span>
    );
  }

  // BLUE
  if (
    [
      'in progress',
      'draft',
      'informational',
      'information',
      'current work',
      'planning',
      'fieldwork',
      'submitted',
      'manager review',
    ].includes(normalized)
  ) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border bg-sky-50 text-sky-700 border-sky-200/80 ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } ${className}`}
      >
        {status}
      </span>
    );
  }

  // AMBER
  if (
    [
      'pending',
      'review',
      'in review',
      'upcoming',
      'awaiting response',
      'awaiting client',
      'partially paid',
      'medium',
      'ready for review',
    ].includes(normalized)
  ) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border bg-amber-50 text-amber-700 border-amber-200/80 ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } ${className}`}
      >
        {status}
      </span>
    );
  }

  // RED
  if (
    [
      'overdue',
      'delayed',
      'high risk',
      'high',
      'critical',
      'error',
      'at risk',
      'urgent',
      'returned',
    ].includes(normalized)
  ) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold border bg-rose-50 text-rose-700 border-rose-200/80 ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } ${className}`}
      >
        {status}
      </span>
    );
  }

  // PURPLE
  if (
    [
      'partner review',
      'special approval',
      'eqcr',
      'finalized',
    ].includes(normalized)
  ) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border bg-purple-50 text-purple-700 border-purple-200/80 ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        } ${className}`}
      >
        {status}
      </span>
    );
  }

  // GRAY / DEFAULT
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border bg-neutral-100 text-neutral-600 border-neutral-200/80 ${
        size === 'sm' ? 'text-[10px]' : 'text-xs'
      } ${className}`}
    >
      {status}
    </span>
  );
};
