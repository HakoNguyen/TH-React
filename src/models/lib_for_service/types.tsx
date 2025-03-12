// lib/types.ts
export type Employee = {
    id: string;
    name: string;
    maxCustomers: number;
    workSchedule: { [key: string]: string };
  };
  
  export type Service = {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
  
  export type Appointment = {
    id: string;
    date: string;
    employeeId: string;
    serviceId: string;
    status: 'Chờ duyệt' | 'Xác nhận' | 'Hoàn thành' | 'Hủy';
    customerName: string;
  };
  
  export type Review = {
    id: string;
    appointmentId: string;
    employeeId: string;
    rating: number;
    comment?: string;
    response?: string;
  };