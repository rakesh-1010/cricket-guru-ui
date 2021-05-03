import React, {useState, useEffect} from "react";

import { Calendar, Tag } from 'antd';

import AntModal from './common/modal';
import { Radio, Input, Select, Button } from "antd";
import 'antd/dist/antd.css';
import moment from 'moment';
import "../App.css";
import { useDispatch } from "react-redux";
import { createAttendance } from "../actions/attendance";
import FeesFormModal from "./FeesFormModal";

const AttendanceFeesCalendar = (props) => {
  const { currentPlayer } = props;

  const [visible, setvisible] = useState(false);
  const [message, setMessage] = useState("")

  const showModal = () => {
    setvisible(true);
  };

  const dispatch = useDispatch();
  
  const [currentClickedDate, setCurrentClickedDate] = useState(moment(new Date()));
  const [calendarMode, setCalendarMode] = useState("month");

  const [selectedAttendance, setSelectedAttendance] = useState({});

  const onPanelChange = (value, mode) => {
    console.log(mode);
    setCalendarMode(mode);
  }
      
  useEffect(() => {
    let listData = {};
    currentPlayer.attendances.forEach(att => { listData[att.date] = att.status})
    setSelectedAttendance(listData);
  }, [currentPlayer])

  const dateCellRender = (value, currentPlayer) => { 
    const item = selectedAttendance[value.format("YYYY-MM-DD")];
    return (
      <>
        { item && 
          <Tag color={item === "Present" ? "green" : "red" }>
            {item}
          </Tag>
        }
      </>
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

  const handleAttendance = (e, datevalue) => {
    let dateValStr = datevalue.format("YYYY-MM-DD");

    if(e.target.value !== ""){
      dispatch(createAttendance(currentPlayer.id, dateValStr, e.target.value))
        .then(response => {
          console.log(response);
          setSelectedAttendance( prevState => ({
            ...prevState,
            [dateValStr]: e.target.value
          }));
          setMessage("The Player Attendance was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
  const loadAttendance = (value) => {
    if(calendarMode === "month"){
      // let attendanceStatus = getListData(value, currentPlayer);
      let dateValStr = value.format("YYYY-MM-DD");
      return(
        <>
          <p>{message}</p>
          <Radio.Group defaultValue={""} value={selectedAttendance[dateValStr] || ""} onChange={(e) => handleAttendance(e, value)}>
            <Radio.Button value="Present" class="present-radio">Present</Radio.Button>
            <Radio.Button value="Absent" class="absent-radio" >Absent</Radio.Button>
            <Radio.Button value="" class="na-radio">NA</Radio.Button>
          </Radio.Group>
        </>
      )
    }
  }

  const handleFees = (e, datevalue) => {
    let dateValStr = datevalue.format("YYYY-MM-DD");

    if(e.target.value !== ""){
      dispatch(createAttendance(currentPlayer.id, dateValStr, e.target.value))
        .then(response => {
          console.log(response);
          setSelectedAttendance( prevState => ({
            ...prevState,
            [dateValStr]: e.target.value
          }));
          setMessage("The Player Attendance was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  const loadFees = (currentClickedDate) => {
    if(calendarMode === "year"){
      return(
        <FeesFormModal 
          handleFees={(e, currentClickedDate) => handleFees(e, currentClickedDate)} 
          currentClickedDate={currentClickedDate}
        />
      )
    }
  }

  const onSelect = (value) => {
    setCurrentClickedDate(value);
    showModal();
  }
  let feesModalTitle = `Add fees for ${currentClickedDate.format('MMM')}`;
  let attendanceModalTitle = `Mark Attendance for ${currentClickedDate.format('DD-MM-YYYY')}`;
  let modalTitle = calendarMode === "month" ? attendanceModalTitle :  feesModalTitle
  return(
    <>
      <Calendar 
          dateCellRender={(value) => dateCellRender(value, currentPlayer)}
          monthCellRender={monthCellRender} 
          onSelect={onSelect}
          onPanelChange={onPanelChange}
      />
      <AntModal visible={visible} setvisible={setvisible} title={modalTitle} >
        {loadAttendance(currentClickedDate)}
        {loadFees(currentClickedDate)}
      </AntModal>
    </>
  )

}

export default AttendanceFeesCalendar