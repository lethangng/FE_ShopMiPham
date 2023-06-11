import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "./chartConfig";

interface ChartProps {
  type: any;
  data: any;
  options?: any;
}

const ChartComponent: React.FC<ChartProps> = ({ type, data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: type,
        data: data,
        options: options,
      });
    }
  }, [type, data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
