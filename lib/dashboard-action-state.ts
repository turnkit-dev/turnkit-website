export type DashboardActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  timestamp: number;
  fullKey?: string;
  reauthPath?: string;
};

export const initialDashboardActionState: DashboardActionState = {
  status: 'idle',
  message: '',
  timestamp: 0,
};
