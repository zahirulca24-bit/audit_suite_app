export interface Engagement {
  id: string;
  client: string;
  engagement: string;
  type: string;
  inCharge: string;
  dueDate: string;
  progress: number;
  status: 'In Progress' | 'Planning' | 'Awaiting Client' | 'Review' | 'Completed';
}

export interface TaskItem {
  id: string;
  title: string;
  client: string;
  priority: 'High' | 'Medium' | 'Low';
  dueText: string;
  isUrgent?: boolean;
  completed: boolean;
}

export interface ClientRequest {
  id: string;
  client: string;
  request: string;
  dueDate: string;
  status: 'Pending' | 'Received' | 'Approved';
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timeAgo: string;
  type: 'upload' | 'assignment' | 'response' | 'invoice';
}

export interface MonthlyTeamData {
  month: string;
  count: number;
  heightPercent: number;
}
