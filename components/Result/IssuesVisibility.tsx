import React, {useState} from 'react'
import { Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['High', 'Medium', 'Low', 'Informational', 'Optimization'];
const defaultCheckedList = plainOptions;


const IssuesVisibility: React.FC  = () => {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  
    const onChange = (list: CheckboxValueType[]) => {
      setCheckedList(list);
    };
  
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
      setCheckedList(e.target.checked ? plainOptions : []);
    };
  
    return (
      <>
        <Checkbox indeterminate={indeterminate} className='mr-2' onChange={onCheckAllChange} checked={checkAll}>
          Show all issues
        </Checkbox>
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      </>
    );
}

export default IssuesVisibility