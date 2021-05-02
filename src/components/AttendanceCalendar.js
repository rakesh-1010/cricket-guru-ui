import React, {useState} from "react";

import { Calendar, Tag } from 'antd';

import '../styles/AttendanceCalendar.css';
import AntModal from './common/modal';
import { Radio, Input, Select, Button } from "antd";
import 'antd/dist/antd.css';
import moment from 'moment';
import "../App.css"

const AttendanceCalendar = () => {

  const [visible, setvisible] = useState(false);

  const showModal = () => {
    setvisible(true);
  }
  
  const [currentClickedDate, setCurrentClickedDate] = useState(moment(new Date()));
  const [calendarMode, setCalendarMode] = useState("month");
  
  const getListData = (value) => {
    let date = Object.keys(value).length === 0 ? "" : value.format('DD-MM-YYYY');

    let listData = {
      "01-05-2021": 'Absent',
      "02-05-2021": 'Present',
      "03-05-2021": 'Present',
      "05-05-2021": 'Present',
      "06-05-2021": 'Present',
      "10-05-2021": 'Present',
      "20-05-2021": 'Absent',
      "21-05-2021": 'Present'
    }
    return listData[date] || "";
  }

  const onPanelChange = (value, mode) => {
    console.log(mode);
    setCalendarMode(mode);
  }
      
  const dateCellRender = (value) => { 
    const item = getListData(value);
    return (
      <Tag color={item === "Present" ? "green" : "red" }>
        {item}
      </Tag>
    )
  }
      
  const getMonthData = (value) => {  
    if (value.month() === 3 && value.year() === 2021) {
      return {fees: "Rs. 1500", status: "Payment Due"};
    }else if(value.month() === 0  && value.year() === 2021){
      return {fees: "Rs. 1500", status: "Payment Received"};
    }else if(value.month() === 1  && value.year() === 2021){
        return {fees: "Rs. 1500", status: "Payment Received"};
    }else if(value.month() === 2  && value.year() === 2021){
        return {fees: "Rs. 1500", status: "Payment Received"};
    }

  }

  const paymentStatusLabelColor = (status) => {
    if(status === "Payment Received"){
        return "green";
    }else if(status === "Payment Due"){
        return "red";
    }else{
        return "blue";
    }

  }
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month" >
        <section>{num.fees}</section>
        <span>
            <Tag color={paymentStatusLabelColor(num.status)}>
                {num.status}
            </Tag>
        </span>
      </div>
    ) : null;
  }

  const handleAttendance = (e) => {
    console.log(e);
  }
  const addAttendance = (value) => {
    if(calendarMode === "month"){
      let attendanceStatus = getListData(value);
      return(
        <Radio.Group value={attendanceStatus} onChange={handleAttendance}>
          <Radio.Button value="Present" class="present-radio">Present</Radio.Button>
          <Radio.Button value="Absent" class="absent-radio" >Absent</Radio.Button>
          <Radio.Button value="" class="na-radio">NA</Radio.Button>
        </Radio.Group>
      )
    }
  }

  const addFees = (currentClickedDate) => {
    if(calendarMode === "year"){
      return(
        <span>
          <Input
            type="text"
            size={10}
            style={{ width: '65%', marginRight: '3%' }}
            prefix={"₹"} placeholder="Amount"
          />
          <Select
            value={"due"}
            size={10}
            style={{ width: '32%' }}
          >
            <Select.Option value="paid">Payment Received</Select.Option>
            <Select.Option value="due">Payment Due</Select.Option>
          </Select>
          <br/>
          <br/>
          <Button type="primary" htmlType="submit">Submit</Button>
        </span> 
      )
    }
  }

  const fetchAttendance = (value) => {
    console.log(value);
  }
  const onSelect = (value) => {
    setCurrentClickedDate(value);
    showModal();
  }

  let modalTitle = calendarMode === "month" ? `Mark Attendance for ${currentClickedDate.format('DD-MM-YYYY')}` : "Add fees" 
  return(
    <>
      <Calendar 
          dateCellRender={dateCellRender} 
          monthCellRender={monthCellRender} 
          onSelect={onSelect}
          onPanelChange={onPanelChange}
      />
      <AntModal visible={visible} setvisible={setvisible} title={modalTitle} >
        {addAttendance(currentClickedDate)}
        {addFees(currentClickedDate)}
      </AntModal>
    </>
  )

}

export default AttendanceCalendar