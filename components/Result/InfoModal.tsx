import React from 'react'
import { ResultType } from '../../interfaces/results';
import { Tag, Descriptions } from 'antd';

interface InfoModalProps {
    modalData: ResultType; // Replace 'any' with the actual type of 'modalData' if possible
}

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

                <Descriptions.Item label="Hint" span={3}> {modalData.hint} </Descriptions.Item>
                    

                <Descriptions.Item label="Other info">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem nulla, suscipit quis atque animi esse cum aut, eos molestias saepe voluptatem eum quisquam id omnis impedit doloremque repellat inventore maxime!
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default InfoModal