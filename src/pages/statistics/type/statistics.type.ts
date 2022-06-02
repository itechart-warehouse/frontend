export interface UserLogs {
  id: string;
  user_id: string;
  username: string;
  company: string;
  data: string;
  action: string;
  changes: {};
  type: string;
}

export type StatisticsType = {
  userLogs: UserLogs[];
};
