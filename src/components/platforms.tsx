import React, { useState } from "react";
import styled from "styled-components";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { IconBarChartLineFill, IconPieChart } from "../assets/icons";

const Platforms = (): React.ReactElement => {
  const platforms = [
    {
      name: "Book Bazar",
      price: "$250,000,000",
      percentage: "15%",
    },
    {
      name: "Artisan Aisle",
      price: "$1,800,000",
      percentage: "10%",
    },
    {
      name: "Top Troop",
      price: "$1,200,000",
      percentage: "8%",
    },
  ];

  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const parsePercentage = (percentage: string): number => {
    return parseFloat(percentage.replace("%", ""));
  };

  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "bar" ? "pie" : "bar"));
  };

  return (
    <PlatformsRenderer id="platforms_table">
      <header>
        <h3>Top Platforms</h3>
        <span onClick={toggleChartType}>
          {chartType === "bar" ? (
            <>
              <IconPieChart className="chart-icon" /> See Pie Chart
            </>
          ) : (
            <>
              <IconBarChartLineFill className="chart-icon" /> See Bar Chart
            </>
          )}
        </span>
      </header>
      {chartType === "bar" ? (
        <div className="platform-details">
        {platforms.map((platform, i: number) => (
          <div className="platform-item" key={i}>
            <h4 className="name">{platform.name}</h4>
            <div className="progress">
              <span style={{ width: platform.percentage, backgroundColor: getRandomColor() }}></span>
            </div>
            <div className="price_percentage">
              <span className="price">{platform.price}</span>
              <span className="percentage">{"+" + platform.percentage}</span>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="platform-details">
        <PieChart width={400} height={400}>
          <Pie
            data={platforms.map((platform) => ({
              ...platform,
              percentage: parsePercentage(platform.percentage),
            }))}
            dataKey="percentage"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {platforms.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        </div>
      )}
    </PlatformsRenderer>
  );
};

export default Platforms;

const PlatformsRenderer = styled.div`
  padding: 5px 10px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  header span {
    cursor: pointer;
    font-size: 12px;
    color: #39c9a0;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .chart-icon {
    fill: #39c9a0;
    width: 14px;
    height: 14px;
  }

  .platform-details {
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    margin-top: 10px;
  }

  .platform-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 8px;
    padding: 10px;
  }

  .progress {
    width: 100%;
    height: 10px;
    background-color: #ededed;
    border-radius: 12px;
    position: relative;
  }

  .progress span {
    position: absolute;
    background-color: #39c9a0;
    height: 100%;
    border-radius: 12px;
    transition: 0.3s ease-out;
  }

  .price_percentage {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .platform-item .name {
    font-size: 14px;
  }

  .platform-item .price,
  .percentage {
    font-size: 12px;
  }

  @media (max-width: 767px) {
    .platform-item .name {
      font-size: 12px;
    }

    .platform-item .price,
    .percentage {
      font-size: 10px;
    }

    header h3 {
      font-size: 14px;
    }
  }
`;
