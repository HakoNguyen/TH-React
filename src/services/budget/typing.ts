export interface BudgetItem {
    category: 'Ăn uống' | 'Di chuyển' | 'Lưu trú' | 'Khác';
    amount: number;
  }
  
  export interface Budget {
    id: number;
    totalBudget: number;
    items: BudgetItem[]; 
  }