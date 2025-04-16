import { useState, useEffect } from 'react';
import { Layout, Typography, Card, InputNumber, Form, Space } from 'antd';
import BudgetChart from '../../components/Budget';
import { mockBudget } from '../../data/budget/budget';
import { Budget } from '../../services/budget/typing';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function BudgetPage() {
  const [budget, setBudget] = useState<Budget>(() => {
    const savedBudget = localStorage.getItem('budget');
    return savedBudget ? JSON.parse(savedBudget) : mockBudget;
  });

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const handleTotalBudgetChange = (value: number | null) => {
    if (value !== null) {
      setBudget((prev) => ({ ...prev, totalBudget: value }));
    }
  };

  const handleItemAmountChange = (category: string, value: number | null) => {
    if (value !== null) {
      setBudget((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.category === category ? { ...item, amount: value } : item
        ),
      }));
    }
  };

  return (
    <Layout style={{ background: '#fff' }}>
      <Header style={{ background: '#ff4d4f', padding: '0 24px' }}>
        <Title level={2} style={{ color: '#fff', margin: '16px 0' }}>
          Quản lý ngân sách
        </Title>
      </Header>
      <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Card
          title="Phân bổ ngân sách"
          style={{ borderColor: '#ff4d4f', borderRadius: '8px' }}
          headStyle={{ color: '#ff4d4f', borderBottom: '2px solid #ff4d4f' }}
        >
          <Form layout="vertical" style={{ marginBottom: '24px' }}>
            <Form.Item label="Ngân sách tổng (VNĐ)" style={{ marginBottom: '16px' }}>
              <InputNumber
                value={budget.totalBudget}
                onChange={handleTotalBudgetChange}
                min={0}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => (value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0)}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              {budget.items.map((item) => (
                <Form.Item
                  key={item.category}
                  label={`${item.category} (VNĐ)`}
                  style={{ marginBottom: '8px' }}
                >
                  <InputNumber
                    value={item.amount}
                    onChange={(value) => handleItemAmountChange(item.category, value)}
                    min={0}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => (value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0)}
                    style={{ width: '100%', maxWidth: '300px' }}
                  />
                </Form.Item>
              ))}
            </Space>
          </Form>
          <BudgetChart budget={budget} />
        </Card>
      </Content>
    </Layout>
  );
}