import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['High', 'Medium', 'Low', 'Informational', 'Optimization'];

interface IssuesVisibilityProps {
  checkedList: CheckboxValueType[];
  onChange: (list: CheckboxValueType[]) => void;
}

const IssuesVisibility: React.FC<IssuesVisibilityProps> = ({ checkedList, onChange }) => {
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.checked ? plainOptions : []);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} className='mr-2' onChange={onCheckAllChange} checked={checkAll}>
        Show all issues
      </Checkbox>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </>
  );
};

export default IssuesVisibility;
