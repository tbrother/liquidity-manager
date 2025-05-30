export interface Order {
  id: string;
  term: number;
  amount: number;
  timestamp: Date;
  status: "pending" | "filled" | "cancelled";
}

export interface YieldCurvePoint {
  term: number;
  yield: number;
  date: Date;
}

export interface TreasuryData {
  date: Date;
  yields: YieldCurvePoint[];
}
