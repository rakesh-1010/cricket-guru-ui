import React from "react";

import { Calendar, Tag } from 'antd';

import '../styles/AttendanceCalendar.css';
import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue";


const AttendanceCalendar = () => {
    function getListData(value) {
        let listData;
        switch (value.date()) {
          case 1:
            listData = [
                { type: 'normal', content: 'Present' },
            ]; break;
          case 2:
            listData = [
                { type: 'normal', content: 'Present' },
            ]; break;
          case 3:
            listData = [
                { type: 'normal', content: 'Present' },
            ]; break;
          case 4:
            listData = [
                { type: 'normal', content: 'Present' },
            ]; break;
          case 5:
            listData = [
                { type: 'normal', content: 'Present' },
            ]; break;
          case 8:
            listData = [
              { type: 'normal', content: 'Present' },
            ]; break;
          case 10:
            listData = [
              { type: 'error', content: 'Present' },
            ]; break;
          case 15:
            listData = [
              { type: 'warning', content: 'Absent' },
            ]; break;
          default:
        }
        return listData || [];
      }

      const onPanelChange = (value, mode) => {
        console.log(value, mode);
      }
      
      function dateCellRender(value) {
        let colorCode = {
            NA: "warning",
            Present: "green",
            Absent: "red"
        }  
        const listData = getListData(value);
        return (
          <ul className="events">
            {
              listData.map(item => (
                <li key={item.content}>
                  <span className={`event-${item.type}`}>
                    <Tag color={colorCode[item.content]}>{item.content}</Tag>
                  </span>
                  
                </li>
              ))
            }
          </ul>
        );
      }
      
      function getMonthData(value) {  
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
        if(status=="Payment Received"){
            return "green";
        }else if(status=="Payment Due"){
            return "red";
        }else{
            return "blue";
        }

      }
      
      function monthCellRender(value) {
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

      return(
        <Calendar 
            dateCellRender={dateCellRender} 
            monthCellRender={monthCellRender} 
            onPanelChange={onPanelChange}
        />
      )

}

export default AttendanceCalendar