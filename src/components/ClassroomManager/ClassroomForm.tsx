import React from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import { Classroom } from '@/models/classroom';
import { values } from 'lodash';

const { Option } = Select;

interface ClassroomFormProps {
    classroom: Classroom | null;
    onSave: (values: Classroom) => void;
    onCancel: () => void;
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({ classroom, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const handleSubmit = (formValues: any) => {
        onSave({ ...classroom, ...formValues, id: classroom?.id || formValues.id});
        form.resetFields();
    };
    return (
            <Modal
              visible={true}
              title={classroom ? 'Chỉnh sửa phòng học' : 'Thêm phòng học'}
              onCancel={onCancel}
              footer={null}
            >
              <Form
                form={form}
                initialValues={classroom || {}}
                onFinish={handleSubmit}
                layout="vertical"
              >
                <Form.Item
                  name="id"
                  label="Mã phòng"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mã phòng' },
                    { max: 10, message: 'Mã phòng tối đa 10 ký tự' }
                  ]}
                >
                  <Input disabled={!!classroom} />
                </Form.Item>
        
                <Form.Item
                  name="name"
                  label="Tên phòng"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên phòng' },
                    { max: 50, message: 'Tên phòng tối đa 50 ký tự' }
                  ]}
                >
                  <Input />
                </Form.Item>
        
                <Form.Item
                  name="capacity"
                  label="Số chỗ ngồi"
                  rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi' }]}
                >
                  <Input type="number" min={1} />
                </Form.Item>
        
                <Form.Item
                  name="type"
                  label="Loại phòng"
                  rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
                >
                  <Select>
                    <Option value="THEORY">Lý thuyết</Option>
                    <Option value="PRACTICE">Thực hành</Option>
                    <Option value="HALL">Hội trường</Option>
                  </Select>
                </Form.Item>
        
                <Form.Item
                  name="personInCharge"
                  label="Người phụ trách"
                  rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
                >
                  <Select>
                    <Option value="person1">Nguyễn Văn A</Option>
                    <Option value="person2">Trần Thị B</Option>
                    <Option value="person3">Lê Văn C</Option>
                  </Select>
                </Form.Item>
        
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                  <Button onClick={onCancel} style={{ marginLeft: 8 }}>
                    Hủy
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          );
        };
export default ClassroomForm;