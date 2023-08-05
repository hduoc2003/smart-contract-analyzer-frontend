import React from 'react'
import { ResultType } from '../../interfaces/results';
import { Tag, Descriptions } from 'antd';

import Highlighter from '../../utils/Highlighter';
interface InfoModalProps {
    modalData: ResultType; // Replace 'any' with the actual type of 'modalData' if possible
}

const markdown = `
  \`\`\`typescript
        /*
        * @source: http://blockchain.unica.it/projects/ethereum-survey/attacks.html#simpledao
        * @author: Atzei N., Bartoletti M., Cimoli T
        * Modified by Josselin Feist
        */
        pragma solidity 0.4.24;

        contract SimpleDAO {
            mapping(address => uint) public credit;

            function donate(address to) public payable {
                credit[to] += msg.value;
            }

            function withdraw(uint amount) public {
                if (credit[msg.sender] >= amount) {
                    require(msg.sender.call.value(amount)());
                    credit[msg.sender] -= amount;
                }
            }

            function queryCredit(address to) public view returns (uint) {
                return credit[to];
            }
        }

  \`\`\`
`;

const InfoModal : React.FC<InfoModalProps> = (props) => {
    const { modalData } = props;
    console.log(modalData);
    let color = modalData.severity.length > 5 ? 'yellow' : 'green';
    if (modalData.severity === 'High') {
        color = 'volcano';
    }
    return (
        <div >
            <Descriptions title="Issues's infomation" bordered>
                {/* LINE 1 */}
                <Descriptions.Item label="Status" span={2}>
                    {modalData.issue_title}
                </Descriptions.Item>
                <Descriptions.Item label="Severity">
                    <Tag color={color}>
                        {modalData.severity}
                    </Tag>
                </Descriptions.Item>

                {/* LINE 2 */}
                <Descriptions.Item label="Description" span={3}> {modalData.description} </Descriptions.Item>

                {/* LINE 3 */}
                <Descriptions.Item label="Contract" span={1}> {modalData.contract} </Descriptions.Item>
                <Descriptions.Item label="SWC Title" span={1}> {modalData.swc_title} </Descriptions.Item>
                <Descriptions.Item label="SWC ID"> 
                    <Tag color='blue'>
                        {modalData.swcID} 
                    </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Code" span={2}> {modalData.code} </Descriptions.Item>
                <Descriptions.Item label="Line" span={1}> {modalData.line_no} </Descriptions.Item>

                <Descriptions.Item label="Hint" span={3}> {modalData.hint} </Descriptions.Item>
                    
                <Descriptions.Item label="Code" span={3}>
                    <Highlighter markdown={markdown}/>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default InfoModal