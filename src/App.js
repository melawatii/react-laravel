import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Space, Button, Form, Input } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'NIS',
    dataIndex: 'nis',
    key: 'nis',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const App = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const fetchData = () => {
    axios
      .get('http://127.0.0.1:8000/api/students')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();

    const refreshInterval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(refreshInterval);
  }, []);

  const API_URL = 'http://127.0.0.1:8000/api/students';

  const onFinish = async (values) => {
    try {
      const response = await axios.post(API_URL, values);
      console.log('Data inserted successfully:', response.data);
      form.resetFields();
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <Row>
      <Col span={2}></Col>
      <Col span={8}>
        <Table columns={columns} dataSource={data} />
      </Col>

      <Col span={2}></Col>

      <Col span={8}>
        <Form
          form={form}
          name="insertDataForm"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="nis"
            label="NIS"
            rules={[
              {
                required: true,
                message: 'Please enter NIS',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter Name',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="class"
            label="Class"
            rules={[
              {
                required: true,
                message: 'Please enter Class',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={2}></Col>
    </Row>
  );
};

export default App;
