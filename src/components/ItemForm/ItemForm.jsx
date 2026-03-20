import React, { useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Space } from 'antd';
import dayjs from 'dayjs';
import './ItemForm.css';

const ItemForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: dayjs(initialValues.date),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    onSubmit(formattedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="item-form"
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          { required: true, message: 'Пожалуйста, введите имя' },
          { min: 2, message: 'Имя должно содержать минимум 2 символа' },
          { max: 50, message: 'Имя должно содержать максимум 50 символов' },
        ]}
      >
        <Input placeholder="Введите имя" />
      </Form.Item>

      <Form.Item
        name="date"
        label="Дата"
        rules={[
          { required: true, message: 'Пожалуйста, выберите дату' },
        ]}
      >
        <DatePicker
          style={{ width: '100%' }}
          format="DD.MM.YYYY"
          placeholder="Выберите дату"
        />
      </Form.Item>

      <Form.Item
        name="value"
        label="Числовое значение"
        rules={[
          { required: true, message: 'Пожалуйста, введите числовое значение' },
          { type: 'number', min: 0, max: 1000000, message: 'Значение должно быть от 0 до 1 000 000' },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Введите числовое значение"
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          parser={(value) => value.replace(/\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item className="form-buttons">
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Сохранить' : 'Добавить'}
          </Button>
          <Button onClick={onCancel}>
            Отмена
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ItemForm;