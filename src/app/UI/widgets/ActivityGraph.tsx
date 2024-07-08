"use client"

import ActivityCalendar from "react-activity-calendar";
import { Activity, Level } from "react-activity-calendar";

export default function ActivityGraph() {
  // Define your data
  let data = [
    {
      "date": "2023-06-14",
      "count": 2,
      "level": 1
    },
    {
      "date": "2024-04-22",
      "count": 16,
      "level": 3
    },
    {
        "date": "2024-05-22",
        "count": 16,
        "level": 3
      },
      {
        "date": "2024-06-22",
        "count": 16,
        "level": 3
      },

  ];

  // Map your data to the expected type
  const mappedData: Activity[] = data.map(item => ({
    date: item.date,
    count: item.count,
    level: item.level as Level // Assuming Level is an enum
  }));

  return (
    <>
      
      <ActivityCalendar
        data={mappedData}
      />
    </>
  );
}
