export interface Month {
  _id: string;
  id: string;
  month: string;
  nonOperationalExpenses: number;
  operationalExpenses: number;
  revenue: number;
  expenses: number;
}

export interface Days {
  _id: string;
  id: string;
  revenue: number;
  expenses: number;
}

export interface ExpensesByCategory {
  salaries: number;
  services: number;
  supplies: number;
}

export interface GetkpiResponses {
  _v: number;
  _id: string;
  totalExpenses: number;
  totalProfit: number;
  totalRevenue: number;
  updatedAt: string;
  createdAt: string;
  expensesByCategory: Array<ExpensesByCategory>;
  dailyData: Array<Days>;
  monthlyData: Array<Month>;
}

export interface Products {
  _v: number;
  _id: string;
  id: string;
  price: number;
  expense: number;
  transactions: Array<string>;
  updatedAt: string;
  createdAt: string;
}


export interface Transactions {
  _v: number;
  _id: string;
  amount: number;
  buyer: string;
  productIds: Array<string>;
  updatedAt: string;
  createdAt: string;
}
