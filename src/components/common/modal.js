import React from 'react';
import { Modal } from 'antd';

export const AntModal = (props) => {

  const handleOk = (e) => {
    setvisible(false);
  }
  const handleCancel = (e) => {
    console.log(e);
    setvisible(false);
  }

  const {children, visible, setvisible, title} = props;
  
    return (
        <div>
        {/* <Button type="primary" onClick={showModal}>Open</Button> */}
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
        >
            {children}
        </Modal>
        </div>
    );
}

export default AntModal;