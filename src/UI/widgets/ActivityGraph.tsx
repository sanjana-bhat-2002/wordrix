"use client"

import { useEffect } from "react";
import ActivityCalendar from "react-activity-calendar";
import { Activity, Level } from "react-activity-calendar";

export default function ActivityGraph() {
  // Define your data
  // let data = [
  //   {
  //     "date": "2023-06-14",
  //     "count": 2,
  //     "level": 1
  //   },
  //   {
  //     "date": "2024-04-22",
  //     "count": 16,
  //     "level": 3
  //   },
  //   {
  //       "date": "2024-05-22",
  //       "count": 16,
  //       "level": 3
  //     },
  //     {
  //       "date": "2024-06-22",
  //       "count": 16,
  //       "level": 3
  //     },

  // ];

  let data;
  
  const getData = async() => {
    try {
      const response = await fetch('/api/dailypuzzle', {
        method: 'GET', // Explicitly specify GET method
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      data = await response.json(); // or response.text() if the response is plain text
      console.log('Data received:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    getData();
});




  
  // const mappedData: Activity[] = data.map((item: { date: any; count: any; level: number; }) => ({
  //   date: item.date,
  //   count: item.count,
  //   level: item.level as Level // Assuming Level is an enum
  // }));

  return (
    <>
      
      {/* <ActivityCalendar
        data={mappedData}
      /> */}

      <div>gello</div>
    </>
  );
}
