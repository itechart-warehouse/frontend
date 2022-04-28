export interface Values {
  description: string;
  report_type_id: string;
  reported: { id: number; name: string; quantity: string }[];
}

export interface Type {
  id: number;
  name: string;
}

export interface Goods {
  id: number;
  name: string;
  quantity: string;
}
