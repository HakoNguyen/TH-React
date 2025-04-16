import { Budget } from '../../services/budget/typing';

export const mockBudget: Budget = {
  id: 1,
  totalBudget: 100000, 
  items: [
    { category: 'Ăn uống', amount: 1500000 },
    { category: 'Di chuyển', amount: 1000000 },
    { category: 'Lưu trú', amount: 2000000 },
    { category: 'Khác', amount: 500000 },
  ],
};