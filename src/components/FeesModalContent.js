import React, { useState } from "react";

import { Input, Select, Button } from "antd";
const FeesModalContent = (props) => {
  const { handleFees, message, selectedPlayerFees, currentClickedDate } = props;

  const checkfee = (_, value) => {
    if (value.amount > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Amount must be greater than zero!"));
  };

  const getDefaultFees = () => {
    let selectedFee = selectedPlayerFees[currentClickedDate.format("YYYY-MM")];

    return {
      amount: (selectedFee && selectedFee.amount) || 0,
      status: (selectedFee && selectedFee.status) || "due",
    };
  };

  const [amount, setAmount] = useState(getDefaultFees().amount);
  const [status, setStatus] = useState(getDefaultFees().status);

  const onamountChange = (e) => {
    let newamount = e.target.value;
    setAmount(newamount);
  };

  const onStatusChange = (status) => {
    setStatus(status);
  };

  const handleSubmit = () => {
    handleFees({ amount: amount, status: status });
  };

  return (
    <>
      <p>{message}</p>
      <span>
        <Input
          type="text"
          value={amount}
          size={10}
          style={{ width: "65%", marginRight: "3%" }}
          prefix={"₹"}
          placeholder="Amount"
          onChange={onamountChange}
        />
        <Select
          placeholder="Status"
          value={status}
          size={11}
          style={{ width: "32%" }}
          onChange={onStatusChange}
        >
          <Select.Option value="paid"> Received</Select.Option>
          <Select.Option value="due"> Due</Select.Option>
        </Select>
      </span>
      <br />
      <br />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default FeesModalContent;
