export type UserLogs = {
  id: string;
  username: string;
  company: string;
  date: string;
  action: string;
  changes: {};
  type: string;
};

export type StatisticsType = {
  userLogs: UserLogs[];
  jwt: string;
  logsCount: number;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  filters: object;
  startDate: string | Date;
  endDate: string | Date;
  setUserLogs: (userLogs: UserLogs[]) => void;
};

export type StatAccordion = {
  item: UserLogs;
};

export type DateRangeType = {
  filters: { name: string; action: string };
  setFilters: (filters: { name: string; action: string }) => void;
  setSearchName: (searchName: string) => void;
  setActionData: (action: string) => void;
  startDate: string | Date;
  setStartDate: (startDate: string | Date) => void;
  endDate: string | Date;
  setEndDate: (startDate: string | Date) => void;
};
