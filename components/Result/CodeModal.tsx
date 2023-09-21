import React from 'react'
import { ResultType } from '../../interfaces/results';
import { Tag, Descriptions } from 'antd';

import Highlighter from '../../utils/Highlighter';
interface CodeModalProps {
    parsedData: String; // Replace 'any' with the actual type of 'modalData' if possible
}

const markdown = `
  \`\`\`typescript
        pragma solidity 0.4.24123412341234123;

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

const InfoModal : React.FC<CodeModalProps> = (props) => {
    const { parsedData } = props;
    console.log("🚀 ~ file: CodeModal.tsx:44 ~ codeModalData:", parsedData) 
    return (
        <div >
            <Descriptions title="Code submitted" bordered>
                {/* LINE 1 */}
                <Descriptions.Item label="Code" span={3}>
                    <Highlighter markdown={parsedData}/>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default InfoModal