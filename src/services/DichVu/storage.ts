import type { Employee, Service, Appointment, Review } from '../../models/lib_for_service/types';

export const getLocalData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue; // Tránh lỗi server-side
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setLocalData = <T>(key: string, data: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Khởi tạo dữ liệu mặc định nếu chưa có
export const initializeStorage = () => {
  if (!getLocalData("employees", [] as Employee[]).length) {
    setLocalData("employees", [
      { id: "emp1", name: "Nguyễn Văn A", maxCustomers: 5, workSchedule: { "Friday": "9-17" } },
      { id: "emp2", name: "Trần Thị B", maxCustomers: 3, workSchedule: { "Monday": "10-18" } },
    ]);
  }
  if (!getLocalData("appointments", [] as Appointment[]).length) {
    setLocalData("appointments", [
      { id: "appt1", date: "2025-03-12T10:00:00Z", employeeId: "emp1", serviceId: "srv1", status: "COMPLETED", customerName: "Khách 1" },
      { id: "appt2", date: "2025-03-13T14:00:00Z", employeeId: "emp2", serviceId: "srv2", status: "COMPLETED", customerName: "Khách 2" },
    ]);
  }
  if (!getLocalData("services", [] as Service[]).length) {
    setLocalData("services", [
      { id: "srv1", name: "Cắt tóc", price: 100000, duration: 30 },
      { id: "srv2", name: "Massage", price: 200000, duration: 60 },
    ]);
  }
  if (!getLocalData("reviews", [] as Review[]).length) {
    setLocalData("reviews", [
      { id: "rev1", appointmentId: "appt1", employeeId: "emp1", rating: 4, comment: "Tốt lắm!" },
      { id: "rev2", appointmentId: "appt1", employeeId: "emp1", rating: 5, comment: "Tuyệt vời!" },
      { id: "rev3", appointmentId: "appt2", employeeId: "emp2", rating: 3, comment: "Bình thường" },
    ]);
  }
};