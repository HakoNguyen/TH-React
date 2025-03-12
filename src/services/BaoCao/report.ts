import { getLocalData } from "../DichVu/storage";
import { Appointment, Service, Employee } from "../../models/lib_for_service/types";

export const getReports = () => {
  const appointments = getLocalData("appointments", [] as Appointment[]);
  const services = getLocalData("services", [] as Service[]);
  const employees = getLocalData("employees", [] as Employee[]);

  // Lịch hẹn theo ngày
  const appointmentsByDate = appointments
    .filter((a) => a.status === "Hoàn thành")
    .reduce((acc, curr) => {
      const date = new Date(curr.date).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Lịch hẹn theo tháng
  const appointmentsByMonth = appointments
    .filter((a) => a.status === "Hoàn thành")
    .reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString("default", { month: "long", year: "numeric" });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Doanh thu theo dịch vụ
  const revenueByService = appointments
    .filter((a) => a.status === "Hoàn thành")
    .reduce((acc, curr) => {
      const service = services.find((s) => s.id === curr.serviceId);
      if (service) {
        acc[service.name] = (acc[service.name] || 0) + service.price;
      }
      return acc;
    }, {} as Record<string, number>);

  // Doanh thu theo nhân viên
  const revenueByEmployee = appointments
    .filter((a) => a.status === "Hoàn thành")
    .reduce((acc, curr) => {
      const employee = employees.find((e) => e.id === curr.employeeId);
      const service = services.find((s) => s.id === curr.serviceId);
      if (employee && service) {
        acc[employee.name] = (acc[employee.name] || 0) + service.price;
      }
      return acc;
    }, {} as Record<string, number>);

  return {
    appointmentsByDate,
    appointmentsByMonth,
    revenueByService,
    revenueByEmployee,
  };
};