import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Tag } from 'antd';
import { Task, loadTasks, addTask, updateTask, deleteTask, toggleTaskCompletion } from '../../services/TodoList';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleAddTask = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(deleteTask(tasks, id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks(toggleTaskCompletion(tasks, id));
  };

  const handleSaveTask = () => {
    form.validateFields().then((values) => {
      if (editingTask) {
        const updatedTask = { ...editingTask, ...values };
        setTasks(updateTask(tasks, updatedTask));
      } else {
        const newTask: Task = { id: tasks.length + 1, completed: false, ...values };
        setTasks(addTask(tasks, newTask));
      }
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <Button type="primary" onClick={handleAddTask} className="mb-4">
        Create Task
      </Button>
      <Table
        dataSource={tasks}
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
              <span style={{ textDecoration: record.completed ? 'line-through' : 'none' }}>{text}</span>
            ),
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Status',
            key: 'status',
            render: (_, record) =>
              record.completed ? <Tag color="green">Completed</Tag> : <Tag color="volcano">Pending</Tag>,
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => handleEditTask(record)}>
                  Edit
                </Button>
                <Button type="link" danger onClick={() => handleDeleteTask(record.id)}>
                  Delete
                </Button>
                <Button type="link" onClick={() => handleToggleComplete(record.id)}>
                  {record.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id"
      />
      <Modal
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSaveTask}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Task Title" name="title" rules={[{ required: true, message: 'Please enter a task title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Task Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a task description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
