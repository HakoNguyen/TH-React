"use client";
import React from "react";
import { Card, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";


const mockReports = {
  appointmentsByDate: {
    "2025-03-10": 5,
    "2025-03-11": 8,
    "2025-03-12": 6,
  },
  appointmentsByMonth: {
    "03-2025": 50,
    "02-2025": 42,
    "01-2025": 38,
  },
  revenueByService: {
    "Cắt tóc": 1500000,
    "Spa": 5000000,
    "Khám bệnh": 3000000,
  },
  revenueByEmployee: {
    "Nguyễn Văn A": 2500000,
    "Trần Thị B": 4000000,
    "Lê Văn C": 3000000,
  },
};

const convertData = (data) =>
  Object.entries(data).map(([key, value]) => ({ name: key, value }));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function ReportsPage() {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        📊 Báo cáo Thống kê
      </Typography.Title>

   
      <Card title="📅 Lịch hẹn theo ngày" style={{ marginBottom: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={convertData(mockReports.appointmentsByDate)}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name='Số lượng lịch hẹn' fill="#0088FE" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="📆 Lịch hẹn theo tháng" style={{ marginBottom: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={convertData(mockReports.appointmentsByMonth)}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name='Số lượng lịch hẹn' fill="#00C49F" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="💰 Doanh thu theo dịch vụ" style={{ marginBottom: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={convertData(mockReports.revenueByService)}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {convertData(mockReports.revenueByService).map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card title="👨‍💼 Doanh thu theo nhân viên">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={convertData(mockReports.revenueByEmployee)}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {convertData(mockReports.revenueByEmployee).map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}