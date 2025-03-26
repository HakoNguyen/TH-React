import React, { useState } from "react";
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { FilterParams } from "@/models/classroom";

interface ClassroomFilterProps {
    onFilter: (params: FilterParams) => void;
  }
  
  const ClassroomFilter: React.FC<ClassroomFilterProps> = ({ onFilter }) => {
    const [form] = Form.useForm();
    const [filterParams, setFilterParams] = useState<FilterParams>({ searchText: "", type: undefined });
  
    const handleSearch = () => {
      const values = form.getFieldsValue();
      const newParams: FilterParams = {
        searchText: values.searchText?.trim(),
        type: values.type
      };
      setFilterParams(newParams);
      onFilter(newParams);
    };
  
    const handleReset = () => {
      form.resetFields();
      setFilterParams({ searchText: "", type: undefined });
      onFilter({ searchText: "", type: undefined });
    };
  
    return (
      <Form form={form} layout="vertical" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="searchText" label="Tìm kiếm">
              <Input 
                placeholder="Nhập mã phòng hoặc tên phòng" 
                onPressEnter={handleSearch}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="type" label="Loại phòng">
              <Select placeholder="Chọn loại phòng" allowClear>
                <Select.Option value="THEORY">Lý thuyết</Select.Option>
                <Select.Option value="PRACTICE">Thực hành</Select.Option>
                <Select.Option value="HALL">Hội trường</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label=" " colon={false}>
              <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
                Tìm kiếm
              </Button>
              <Button onClick={handleReset}>
                Đặt lại
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };
  
  export default ClassroomFilter;