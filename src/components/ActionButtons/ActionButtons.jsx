import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ActionButtons.css';

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <Space size="middle" className="action-buttons">
      <Tooltip title="Редактировать">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
          className="edit-button"
        />
      </Tooltip>
      <Tooltip title="Удалить">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          className="delete-button"
        />
      </Tooltip>
    </Space>
  );
};

export default ActionButtons;