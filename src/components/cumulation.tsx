import React from "react";
import styled from "styled-components";
import {
  IconArrowTrendUp,
  IconArrowTrendDown,
  IconCartShopping,
  IconCubeOutline,
  IconMoneyDollarCircleFill,
} from "../assets/icons";

const Cumulation = (): React.ReactElement => {
  const cumulations = [
    {
      title: "Total Order",
      value: 350,
      percentage: 23.5,
      icon: IconCubeOutline,
    },
    {
      title: "Total Refund",
      value: 270,
      percentage: -23.5,
      icon: IconMoneyDollarCircleFill,
    },
    {
      title: "Average Sales",
      value: 1567,
      percentage: 23.5,
      icon: IconCartShopping,
    },
    {
      title: "Total Income",
      value: "$350.000",
      percentage: 23.5,
      icon: IconMoneyDollarCircleFill,
    },
  ];

  const getTrendIcon = (percentage: number) => {
    return percentage >= 0 ? (
      <IconArrowTrendUp className="trend-icon" />
    ) : (
      <IconArrowTrendDown className="trend-icon" />
    );
  };

  return (
    <CumulationRenderer id="cummulation_table">
      {cumulations.map((cumulation, i: number) => (
        <div className="cumulationItem" key={i}>
          <div className="chead">
            <span className="c-h-icon-cont">
              {cumulation.icon &&
                React.createElement(cumulation.icon, { className: "c-h-icon" })}
            </span>
          </div>
          <span className="title">{cumulation.title}</span>
          <span className="value">{cumulation.value}</span>
          <div className="cfooter">
            <span className="trend">
              {getTrendIcon(cumulation.percentage)}{" "}
              {Math.abs(cumulation.percentage)}%
            </span>
            VS previous month
          </div>
        </div>
      ))}
    </CumulationRenderer>
  );
};

export default Cumulation;

const CumulationRenderer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  .cumulationItem {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    border: 1px solid #ededed;
    border-radius: 12px;
    height: 150px;
    width: 220px;
    background-color: #fff;
    gap: 5px;
    align-items: center;
    justify-content: center;
  }
 

  .chead {
    display: flex;
    justify-content: center;
  }
  .c-h-icon-cont {
    border-radius: 6px;
    padding: 10px;
    border: 1px solid #ededed;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .c-h-icon {
    height: 26px;
    width: 26px;
    fill: #39c9a0;
    stroke: #39c9a0;
    cursor: pointer;
  }
  .cfooter {
    display: flex;
    gap: 10px;
    font-size: 12px;
  }
  .title {
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    color: grey;
  }
  .value {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-weight: 600;
  }
  .cfooter .trend {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: 12px;
    background-color:#ffcaaa;
    color: #dc7839;
    font-size: 11px;
    gap: 5px;
  }

  .cfooter .trend-icon {
    fill:#dc7839;
    stroke: #dc7839;
  }
  @media (max-width: 767px) {
    .cumulationItem {
      width: 90px;
      flex: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .c-h-icon-cont {
      padding: 5px;
    }
    .c-h-icon {
      height: 20px;
      width: 20px;
    }
    .cfooter {
      font-size: 10px;
    }
    .title {
      font-size: 12px;
    }
    .value {
    }
    .cfooter .trend {
      font-size: 9px;
    }
  }
`;
