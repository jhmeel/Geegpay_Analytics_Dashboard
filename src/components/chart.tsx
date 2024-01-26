import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IconChevronDown1, IconChevronUp } from "../assets/icons";
import { Chart } from "react-google-charts";
import DotLoader from "./dLoader";

interface DataPoint {
  day: string;
  price: number;
}

const GChart: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Daily");
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const filters = ["Daily", "Weekly", "Monthly"];
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
      setIsFilterVisible(false);
    }
  };

  const toggleFilterVisible = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    toggleFilterVisible();
  };

  const data: DataPoint[] = [
    { day: "Mon", price: 20000 },
    { day: "Tue", price: 25000 },
    { day: "Wed", price: 30000 },
    { day: "Thu", price: 50000 },
    { day: "Fri", price: 40000 },
    { day: "Sat", price: 45000 },
    { day: "Sun", price: 34000 },
  ];

  const chartData = [
    ["Day", "Price"],
    ...data.map((point) => [point.day, point.price]),
  ];

  return (
    <ChartRenderer id="chart">
      <div className="chart-header" ref={filterRef}>
        <h3 className="chart-title">Sales Trend</h3>
        <div className="chart-filter">
          Sort by:{" "}
          <span
            title="Filter"
            className="filter"
            onClick={() => toggleFilterVisible()}
          >
            {selectedFilter}
            {isFilterVisible ? <IconChevronUp /> : <IconChevronDown1 />}
          </span>
          {isFilterVisible && (
            <ul>
              {filters.map((filt: string, i: number) => (
                <li key={i} onClick={() => handleFilterChange(filt)}>
                  {filt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Chart
        width={"100%"}
        height={!isMobile ? "300px" : "200px"}
        chartType="Bar"
        loader={<div><DotLoader/></div>}
        data={chartData}
        options={{
          title: "Sales Trend",
          chartArea: { width: "70%" },
          hAxis: {
            title: "",
            minValue: 0,
          },
          vAxis: {
            title: "",
            minValue: 0,
          },
          bars: "vertical",
          bar: { groupWidth: "80%" },
          colors: ["#39c9a0"],
        }}
      />
    </ChartRenderer>
  )
};

export default GChart;

const ChartRenderer = styled.div`
  position: relative;
  z-index: 99;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;

  @media (max-width: 767px) {
    .chart-title {
      font-size: 14px;
    }
  }
  .chart-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .chart-filter {
    display: flex;
    gap: 5px;
    font-size: 13px;
    align-items: center;
    justify-content: center;
  }

  .filter {
    padding: 5px 10px;
    border: 1px solid #ededed;
    border-radius: 16px;
    font-size: 13px;
    color: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    cursor: pointer;
    gap: 5px;
  }
  .chart-header ul {
    border: 1px solid #ededed;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    list-style: none;
    background-color: #fff;
    position: absolute;
    z-index: 99;
    right: 10px;
    top: 35px;
  }
  .chart-header ul li {
    padding: 5px 10px;
    transition: 0.3s ease-in-out;
    font-size: 13px;
    color: grey;
    cursor: pointer;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  .chart-header ul li:hover {
    background-color: #94f4d9;
  }

  .chart-header ul li:first-child:hover {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .chart-header ul li:last-child:hover {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .chart-header ul li:last-child {
    border-bottom: none;
  }
`;
