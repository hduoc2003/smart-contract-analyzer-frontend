import React from 'react'
import { Badge, Space } from 'antd';

const IssuesDescription : React.FC = () => {
  return (
    <Space>
        <Badge count='11' showZero color='#faad14' />
      <Badge count='25' />
      <Badge
        className="site-badge-count-109"
        count='4'
        style={{ backgroundColor: '#52c41a' }}
      />
    </Space>
  )
}

export default IssuesDescription