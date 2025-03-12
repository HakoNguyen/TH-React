"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Table, Rate, Button, Typography } from "antd";
import { getLocalData, initializeStorage } from "../../services/DichVu/storage";
import { Employee, Review } from "../../models/lib_for_service/types";

const { Title } = Typography;

export default function EmployeesPage() {
  useEffect(() => {
    initializeStorage();
  }, []);

  const employees = getLocalData("employees", [] as Employee[]);
  const reviews = getLocalData("reviews", [] as Review[]);

  // Tính điểm đánh giá trung bình
  const getAverageRating = (employeeId: string) => {
    const employeeReviews = reviews.filter((r) => r.employeeId === employeeId);
    return employeeReviews.length
      ? employeeReviews.reduce((sum, r) => sum + r.rating, 0) / employeeReviews.length
      : 0;
  };

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Employee) => (
        <Link href={`/employees/${record.id}`} className="text-blue-500 hover:underline">
          {text}
        </Link>
      ),
    },
    {
      title: "Số khách tối đa/ngày",
      dataIndex: "maxCustomers",
      key: "maxCustomers",
      align: "center" as const,
    },
    {
      title: "Lịch làm việc",
      dataIndex: "workSchedule",
      key: "workSchedule",
      render: (schedule: object) => JSON.stringify(schedule),
    },
    {
      title: "Đánh giá",
      key: "rating",
      render: (_: any, record: Employee) => {
        const avgRating = getAverageRating(record.id);
        return (
          <div className="flex items-center">
            <Rate allowHalf disabled value={avgRating} />
            <span className="ml-2 text-gray-600">{avgRating.toFixed(1)}/5</span>
          </div>
        );
      },
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (_: any, record: Employee) => (
        <Link href={`/employees/${record.id}`}>
          <Button type="primary">Xem chi tiết</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-4">
        Danh sách nhân viên
      </Title>
      <Table
        columns={columns}
        dataSource={employees.map((emp) => ({ ...emp, key: emp.id }))}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}