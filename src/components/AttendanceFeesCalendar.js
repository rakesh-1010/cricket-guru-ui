import React, { useState, useEffect } from "react";

import { Calendar, Tag } from "antd";

import AntModal from "./common/modal";
import { Radio } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import "../App.css";
import { useDispatch } from "react-redux";
import { createAttendance, updateAttendance } from "../actions/attendance";
import { createFees, updateFees } from "../actions/fees";
// import FeesFormModal from "./FeesFormModal";
import FeesModalContent from "./FeesModalContent";

const AttendanceFeesCalendar = (props) => {
  const { currentPlayer } = props;

  const [visible, setvisible] = useState(false);
  const [message, setMessage] = useState("");

  const showModal = () => {
    setvisible(true);
  };

  const dispatch = useDispatch();

  const [currentClickedDate, setCurrentClickedDate] = useState(
    moment(new Date())
  );
  const [calendarMode, setCalendarMode] = useState("month");

  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [selectedPlayerFees, setSelectedPlayerFees] = useState({});

  const onPanelChange = (value, mode) => {
    console.log(mode);
    setCalendarMode(mode);
  };

  useEffect(() => {
    let attendanceData = {};
    let feesData = {};
    currentPlayer.attendances.forEach((att) => {
      attendanceData[att.date] = att.status;
    });
    currentPlayer.fees.forEach((fee) => {
      feesData[fee.month] = {
        status: fee.status,
        amount: fee.amount,
      };
    });
    setSelectedAttendance(attendanceData);
    setSelectedPlayerFees(feesData);
  }, [currentPlayer]);


  const dateCellRender = (value) => {
    const item = selectedAttendance[value.format("YYYY-MM-DD")];
    return (
      <>
        {item && <Tag color={item === "Present" ? "green" : "red"}>{item}</Tag>}
      </>
    );
  };

  const paymentStatusLabelColor = (status) => {
    if (status === "paid") {
      return "green";
    } else if (status === "due") {
      return "red";
    } else {
      return "blue";
    }
  };

  const monthCellRender = (value) => {
    const num = selectedPlayerFees[value.format("YYYY-MM")];
    return num ? (
      <div className="notes-month">
        <section>{`Rs. ${num.amount}`}</section>
        <span>
          <Tag color={paymentStatusLabelColor(num.status)}>
            {num.status === "paid" ? "Payment Received" : "Payment Due"}
          </Tag>
        </span>
      </div>
    ) : null;
  };

  const handleAttendance = (e) => {
    let dateValStr = currentClickedDate.format("YYYY-MM-DD");
    let currentAttendance = currentPlayer.attendances.filter(att => 
      att.player_id === currentPlayer.id && att.date === dateValStr
    );
    if (e.target.value !== "" && currentAttendance.length === 0) {
      dispatch(createAttendance(currentPlayer.id, dateValStr, e.target.value))
        .then((response) => {
          console.log(response);
          setSelectedAttendance((prevState) => ({
            ...prevState,
            [dateValStr]: e.target.value,
          }));
          setMessage("The Player Attendance was added successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    }else{
      let attendanceData = {
        date: dateValStr,
        status: e.target.value
      }
      dispatch(updateAttendance(currentAttendance[0].id, attendanceData))
        .then((response) => {
          console.log(response);
          setSelectedAttendance((prevState) => ({
            ...prevState,
            [dateValStr]: e.target.value,
          }));
          setMessage("The Player Attendance was updated successfully!");
        })
        .catch((e) => {
          console.log(e)
        })
    }
  };

  const loadAttendance = () => {
    if (calendarMode === "month") {
      let dateValStr = currentClickedDate.format("YYYY-MM-DD");
      return (
        <>
          <p>{message}</p>
          <Radio.Group
            defaultValue={""}
            value={selectedAttendance[dateValStr] || ""}
            onChange={handleAttendance}
          >
            <Radio.Button value="Present" class="present-radio">
              Present
            </Radio.Button>
            <Radio.Button value="Absent" class="absent-radio">
              Absent
            </Radio.Button>
            <Radio.Button value="" class="na-radio">
              NA
            </Radio.Button>
          </Radio.Group>
        </>
      );
    }
  };

  const handleFees = (fee={}) => {
    let dateValStr = currentClickedDate.format("YYYY-MM");
    let currentFees = currentPlayer.fees.filter(att => 
      att.player_id === currentPlayer.id && att.month === dateValStr
    );
    if (currentFees.length === 0) {
    dispatch(
      createFees(currentPlayer.id, dateValStr, fee.status, fee.amount)
    )
      .then((response) => {
        console.log(response);
        setSelectedPlayerFees((prevState) => ({
          ...prevState,
          [dateValStr]: { amount: fee.amount, status: fee.status },
        }));
        setMessage("The Player Fee was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    }else{
      let feesData = {
        player_id: currentPlayer.id,
        month: dateValStr,
        status: fee.status,
        amount: fee.amount
      }
      dispatch(updateFees(currentFees[0].id, feesData))
        .then((response) => {
          console.log(response);
          setSelectedPlayerFees((prevState) => ({
            ...prevState,
            [dateValStr]: { amount: fee.amount, status: fee.status },
          }));
          setMessage("The Player Attendance was updated successfully!");
        })
        .catch((e) => {
          console.log(e)
        })

    }
  };

  const loadFees = () => {
    if (calendarMode === "year" && visible) {
      return (
        <FeesModalContent
          handleFees={handleFees}
          message={message}
          selectedPlayerFees={selectedPlayerFees}
          currentClickedDate={currentClickedDate}
        />
      );
    }
  };

  const onSelect = (value) => {
    setCurrentClickedDate(value);
    showModal();
  };

  let feesModalTitle = `Add fees for ${currentClickedDate.format("MMM")}`;
  
  let attendanceModalTitle = `Mark Attendance for ${currentClickedDate.format(
    "DD-MM-YYYY"
  )}`;

  let modalTitle =
    calendarMode === "month" ? attendanceModalTitle : feesModalTitle;
  
  return (
    <>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <AntModal visible={visible} setvisible={setvisible} title={modalTitle}>
        {loadAttendance()}
        {loadFees()}
      </AntModal>
    </>
  );
};

export default AttendanceFeesCalendar;
