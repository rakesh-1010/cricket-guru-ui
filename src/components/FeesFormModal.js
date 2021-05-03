import React, {useState} from "react";
import { Form, Input, Select, Button } from 'antd';

const FeesInput = ({ value = {}, onChange }) => {
  const [amount, setamount] = useState(0);
  const [status, setstatus] = useState('due');

  const triggerChange = (changedValue) => {
    onChange?.({
      amount,
      status,
      ...value,
      ...changedValue,
    });
  };

  const onamountChange = (e) => {
    const newamount = parseInt(e.target.value || '0', 10);

    if (Number.isNaN(amount)) {
      return;
    }

    if (!('amount' in value)) {
      setamount(newamount);
    }

    triggerChange({
      amount: newamount,
    });
  };

  const onStatusChange = (newstatus) => {
    if (!('status' in value)) {
      setstatus(newstatus);
    }

    triggerChange({
      status: newstatus,
    });
  };
    return(
        <span>
          <Input
            type="text"
            value={value.amount || amount}
            size={10}
            style={{ width: '65%', marginRight: '3%' }}
            prefix={"₹"} placeholder="Amount"
            onChange={onamountChange}
          />
          <Select
            placeholder="Status"
            value={value.status || status}
            size={11}
            style={{ width: '32%' }}
            onChange={onStatusChange}
          >
            <Select.Option value="paid"> Received</Select.Option>
            <Select.Option value="due"> Due</Select.Option>
          </Select>
        </span> 
    )
}
const FeesFormModal = (props) => {
    const { handleFees, message, currentPlayer, currentClickedDate } = props;
    const onFinish = (values) => {
      handleFees(values)
      console.log('Received values from form: ', values);
    };
  
    const checkfee = (_, value) => {
      if (value.amount > 0) {
        return Promise.resolve();
      }
  
      return Promise.reject(new Error('Amount must be greater than zero!'));
    };
    
    let selectedFee = currentPlayer.fees.filter(fee => 
      fee.month === currentClickedDate.format("YYYY-MM")
    )

    debugger;

    return (
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          fee: {
            amount: (selectedFee.length > 0 && selectedFee[0].amount) || 0,
            status: (selectedFee.length > 0 && selectedFee[0].status) || 'due',
          },
        }}
      >
        <Form.Item
          name="fee"
          rules={[
            {
              validator: checkfee,
            },
          ]}
        >
          <FeesInput />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <p>{ message }</p>
      </Form>
    );
};

export default FeesFormModal;