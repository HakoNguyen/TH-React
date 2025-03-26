import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { Classroom } from '@/models/classroom';

interface ClassroomListProps {
    classrooms: Classroom[];
    onEdit: (classroom: Classroom) => void;
    onDelete: (id: string) => void;
}

const ClassroomList: React.FC<ClassroomListProps> = ({ classrooms, onEdit, onDelete }) => {
    const columns = [
        { title: 'Mã phòng', dataIndex: 'id', key: 'id' },
    { title: 'Tên phòng', dataIndex: 'name', key: 'name' },
    { 
      title: 'Số chỗ ngồi', 
      dataIndex: 'capacity', 
      key: 'capacity',
      sorter: (a: Classroom, b: Classroom) => a.capacity - b.capacity 
    },
    { title: 'Loại phòng', dataIndex: 'type', key: 'type' },
    { title: 'Người phụ trách', dataIndex: 'personInCharge', key: 'personInCharge' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Classroom) => (
        <>
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa phòng này?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
    ];

    return (
        <Table 
        columns={columns}
        dataSource={classrooms}
        rowKey="id"
        />
    );
};

export default ClassroomList;