import { Form, Input, Select, Button } from 'antd';

const FeesInput = () => {
    return(
        <span>
          <Input
            type="text"
            size={10}
            style={{ width: '65%', marginRight: '3%' }}
            prefix={"₹"} placeholder="Amount"
          />
          <Select
            placeholder="Status"
            size={10}
            style={{ width: '32%' }}
          >
            <Select.Option value="paid"> Received</Select.Option>
            <Select.Option value="due"> Due</Select.Option>
          </Select>
        </span> 
    )
}
const FeesFormModal = (props) => {
    const { handleFees, currentClickedDate } = props;
    const onFinish = (values) => {
      handleFees(values, currentClickedDate)
      console.log('Received values from form: ', values);
    };
  
    const checkfee = (_, value) => {
      if (value.number > 0) {
        return Promise.resolve();
      }
  
      return Promise.reject(new Error('Amount must be greater than zero!'));
    };
  
    return (
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          fee: {
            number: 0,
            currency: 'rmb',
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
          <FeesInput handleFees={handleFees} currentClickedDate={currentClickedDate}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
};

export default FeesFormModal;