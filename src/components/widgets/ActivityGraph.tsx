"use client"

import { useEffect, useState } from "react";
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap";

export default function ActivityGraph() {
  const [formattedData, setFormattedData] = useState<{ date: Date; weight: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const convertDateFormat = (inputArray: any[]): { date: Date; weight: number }[] => {
    return inputArray.map(item => {
      const date = new Date(item.date);
      return {
        date: date,
        weight: item.weight,
      };
    });
  };

  const getData = async () => {
    try {
      const response = await fetch("/api/dailypuzzle", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:" + data);
      //console.table(data); 

      const formatted = convertDateFormat(data);
      console.log("Formatted data:" + formatted);
      //console.table(formatted); 

      setFormattedData(formatted);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CalendarHeatmap
          variantClassnames={[
            "text-white hover:text-white bg-red-400 ",
            "text-white hover:text-white bg-green-500 hover:bg-green-500",
            "text-white hover:text-white bg-green-700 hover:bg-green-700",
          ]}
          numberOfMonths={3}
          weightedDates={formattedData}
        />
        
      )}
      
    </>
  );
}
