import React, { useState, useMemo } from 'react';
import { Table, Button, Input, Space, Modal, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ItemForm from '../ItemForm/ItemForm';
import ActionButtons from '../ActionButtons/ActionButtons';
import { filterData } from '../../utils/tableUtils';
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Иван Петров',
      date: '2024-01-15',
      value: 1500,
    },
    {
      id: '2',
      name: 'Мария Иванова',
      date: '2024-02-20',
      value: 2300,
    },
    {
      id: '3',
      name: 'Алексей Сидоров',
      date: '2024-01-10',
      value: 950,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleAdd = (values) => {
    const newItem = {
      ...values,
      id: Date.now().toString(),
    };
    setData([...data, newItem]);
    setModalVisible(false);
    message.success('Запись успешно добавлена');
  };

  const handleEdit = (values) => {
    const updatedData = data.map(item => 
      item.id === editingItem.id ? { ...values, id: item.id } : item
    );
    setData(updatedData);
    setEditingItem(null);
    setModalVisible(false);
    message.success('Запись успешно обновлена');
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Подтверждение удаления',
      content: 'Вы уверены, что хотите удалить эту запись?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => {
        setData(data.filter(item => item.id !== id));
        message.success('Запись удалена');
      },
    });
  };

  const handleEditClick = (record) => {
    setEditingItem(record);
    setModalVisible(true);
  };

  const filteredData = useMemo(() => {
    return filterData(data, searchText);
  }, [data, searchText]);

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ['ascend', 'descend'],
      render: (text) => new Date(text).toLocaleDateString('ru-RU'),
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
      sortDirections: ['ascend', 'descend'],
      render: (text) => text.toLocaleString('ru-RU'),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <ActionButtons className="ant-table-celiiii"
          onEdit={() => handleEditClick(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h1 className="table-title">Управление данными таблицы</h1>
        <Space size="middle" className="data-inputs-flex">
          <Input
            placeholder="Поиск по всем полям..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="search-input"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingItem(null);
              setModalVisible(true);
            }}
            className="add-button"
          >
            Добавить запись
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `Всего ${total} записей`,
        }}
        className="data-table"
        bordered
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingItem ? 'Редактирование записи' : 'Добавление новой записи'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
        footer={null}
        destroyOnClose
        className="form-modal"
      >
        <ItemForm
          initialValues={editingItem}
          onSubmit={editingItem ? handleEdit : handleAdd}
          onCancel={() => {
            setModalVisible(false);
            setEditingItem(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default DataTable;