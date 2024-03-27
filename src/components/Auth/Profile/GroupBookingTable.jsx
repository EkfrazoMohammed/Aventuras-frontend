import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';

const AntTable = () => {
    const columns = [
        {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mobile',
      dataIndex: 'Mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Package ID',
      dataIndex: 'PackageId',
      key: 'PackageId',
    },
    {
      title: 'Package Name',
      dataIndex: 'PackageName',
      key: 'PackageName',
    },
    {
      title: 'Booking Date',
      dataIndex: 'BookingDate',
      key: 'BookingDate',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => <a>contact</a>,
    },
    
  ];
    const expandedRowRender = () => {
      const items = [
        {
          key: '1',
          label: 'Action 1',
        },
        {
          key: '2',
          label: 'Action 2',
        },
      ];
      const columns = [
        {
          title: 'BookingDate',
          dataIndex: 'BookingDate',
          key: 'BookingDate',
        },
        {
          title: 'UserName',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Payment Status',
          key: 'paymentStatus',
          render: () => <Badge status="success" text="Finished" />,
        },
      
      ];
      
      
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };
   
  const data = [{
      key: 1,
      username: 'Raj',
      Mobile: '9123456789',
      email: 'raj@mail.com',
      PackageId: 'AVEN23123',
      PackageName: 'deluxe tour to dubai',
      BookingDate: 'Jun-6-2023',
    },
    {
      key: 2,
      username: 'Alex',
      Mobile: '9123456788',
      email: 'alex@mail.com',
      PackageId: 'AVEN12345',
      PackageName: 'best tour goa',
      BookingDate: 'Jun-12-2023',
    },
    
  ]
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
      />
      
    </>
  );
};
export default AntTable;