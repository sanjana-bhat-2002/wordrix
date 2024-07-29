"use client"

import { useEffect, useState } from "react";
import ActivityCalendar from "react-activity-calendar";
import { Activity, Level } from "react-activity-calendar";
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap"
import { cn } from "@/lib/utils";

export default function ActivityGraph() {
  const [formattedData, setFormattedData] = useState<Activity[]>([]); // Initialize as an empty array

  const convertDateFormat = (inputArray: any[]): Activity[] => {
    return inputArray.map(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
  
      return {
        date: `${year}-${month}-${day}`,
        count: item.count,
        level: item.level as Level
      };
    });
  };
  
  const getData = async () => {
    try {
      const response = await fetch('/api/dailypuzzle', {
        method: 'GET', // Explicitly specify GET method
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data received:', data);
      const formatted = convertDateFormat(data);
      setFormattedData(formatted); // Set the formatted data to state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);
const fadeUpClassname =
"lg:motion-safe lg:motion-safe:animate-fade-up"
  return (
    <>
      
<CalendarHeatmap
  variantClassnames={[
    "text-white hover:text-white bg-red-400 ",
    "text-white hover:text-white bg-green-500 hover:bg-green-500",
    "text-white hover:text-white bg-green-700 hover:bg-green-700",
  ]}
  numberOfMonths={3}
  weightedDates={[
    { date: new Date('July 9, 2024'), weight: 10 }, { date : new Date('Jan 15, 2024'), weight: 1.5 },
    { date: new Date('Jun 12, 2024'), weight: 8 } , { date: new Date('July 1, 2024'), weight: 5 },
    { date: new Date('Jan 19, 2024'), weight: 6 }, { date: new Date('Apr 19, 2024'), weight: 13.5 }
  ]}
/>
      <div>gello</div>
    </>
  );
}
