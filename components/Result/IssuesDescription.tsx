import React from 'react'
import { Badge, Space } from 'antd';

interface IssuesDescriptionProps {
  IssuesData: any
}

const IssuesDescription : React.FC<IssuesDescriptionProps> = (props) => {
  const {IssuesData} = props;
  const counts: Record<string, number> = IssuesData.reduce((acc, issue) => {
    const issueType = issue.severity || 'default';
      // Increment the count for the regular issue type
      const uppercaseType = issueType.toUpperCase();
      acc[uppercaseType] = (acc[uppercaseType] || 0) + 1;
    return acc;
  }, {});

  return (
    <Space>
      <Badge count={counts.HIGH || 0} color='#dc2626'/>
      <Badge count={counts.MEDIUM || 0} color='#ea580c' />
      <Badge count={counts.LOW || 0} color='#d97706' />
      <Badge count={(counts.OPTIMIZATION || 0 + counts.INFORMATIONAL || 0)} color='#2563eb' />
    </Space>
  )
}

export default IssuesDescription