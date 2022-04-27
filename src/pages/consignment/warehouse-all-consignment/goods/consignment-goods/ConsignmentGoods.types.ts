export interface Goods {
  id: number;
  name: string;
  bundle_seria: string;
  bundle_number: string;
  quantity: string;
  placed_date: string;
  warehouse_id: string;
  status: string;
}
export interface Consignment {
  id: number;
  bundle_seria: string;
  bundle_number: string;
}

export interface Warehouse {
  name: string;
}
