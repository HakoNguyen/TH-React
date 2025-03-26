import React, { useState } from "react";
import { Layout, message, Button } from "antd";
import { Classroom, FilterParams } from "@/models/classroom";
import { classroomService } from "@/services/ClassroomManager/classroomService";
import ClassroomList from "@/components/ClassroomManager/ClassroomList";
import ClassroomForm from "@/components/ClassroomManager/ClassroomForm";
import ClassroomFilter from "@/components/ClassroomManager/ClassroomFilter";
import { values } from "lodash";
import e from "express";

const { Content } = Layout;

const ClassroomManager: React.FC = () => { 
    const [classrooms, setClassrooms] = useState<Classroom[]>(classroomService.getClassrooms());
    const [filteredClassrooms, setFilteredClassrooms] = useState<Classroom[]>(classrooms);
    const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleFilter = (params: FilterParams) => {
        let result = [...classrooms];

        if (params.searchText) {
            const searchLower = params.searchText.toLowerCase();
            result = result.filter( classroom => classroom.id.toLowerCase().includes(searchLower) || classroom.name.toLowerCase().includes(searchLower));
        }

        if (params.type) {
            result = result.filter(classroom => classroom.type === params.type);
        }

        setFilteredClassrooms(result);
    };

    const handleSave = (formvalues: Classroom) => {
        const newClassrooms = [...classrooms];
        if (editingClassroom) {
          const index = newClassrooms.findIndex(c => c.id === editingClassroom.id);
          newClassrooms[index] = formvalues;
          message.success('Cập nhật phòng học thành công');
        } else {
          if (classroomService.isNameExist(formvalues.name)) {
            message.error('Tên phòng đã tồn tại');
            return;
          }
          newClassrooms.push(formvalues);
          message.success('Thêm phòng học thành công');
        }
        setClassrooms(newClassrooms);
        setFilteredClassrooms(newClassrooms);
        classroomService.saveClassrooms(newClassrooms);
        setEditingClassroom(null);
        setIsFormVisible(false);
      };

    const handleDelete = (id: string) => {
        const classroom = classrooms.find(c => c.id === id);
    if (classroom && classroom.capacity >= 30) {
      message.error('Không thể xóa phòng có sức chứa từ 30 chỗ trở lên');
      return;
    }
    const newClassrooms = classrooms.filter(c => c.id !== id);
    setClassrooms(newClassrooms);
    setFilteredClassrooms(newClassrooms);
    classroomService.saveClassrooms(newClassrooms);
    message.success('Xóa phòng học thành công');
  };

  const handleAddNew = () => {
    setEditingClassroom(null); 
    setIsFormVisible(true); 
  };

  const handleCancel = () => {
    setEditingClassroom(null);
    setIsFormVisible(false);
  };

  

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <ClassroomFilter onFilter={handleFilter} />
        <Button 
          type="primary" 
          onClick={handleAddNew} 
          style={{ marginBottom: 16 }}
        >
          Thêm phòng học
        </Button>
        {isFormVisible && (
          <ClassroomForm 
            classroom={editingClassroom} 
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        <ClassroomList 
          classrooms={filteredClassrooms}
          onEdit={setEditingClassroom}
          onDelete={handleDelete}
        />
      </Content>
    </Layout>
  );
};

export default ClassroomManager;