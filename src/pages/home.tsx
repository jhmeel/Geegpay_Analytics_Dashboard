import React, { useEffect, useState } from "react";
import { Header, XmHeader } from "../components/header";
import styled from "styled-components";
import NavBar from "../components/navBar";
import OrderTable from "../components/orderTable";
import Platforms from "../components/platforms";
import Cumulation from "../components/cumulation";
import GChart from "../components/chart";

const Home = (): React.ReactElement => {
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
  return (
    <HomeRenderer>
      <div className="icon-tray-cont">
        <NavBar />
      </div>
      <div className="header-cont">{isMobile ? <XmHeader /> : <Header />}</div>

      <section>
        <div className="chart_cumulation">
          <div className="chart-cont">
            <GChart />
          </div>

          <div className="cumulation-cont">
            <Cumulation />
          </div>
        </div>

        <div className="order_platform">
          <div className="order-cont">
            <OrderTable />
          </div>

          <div className="platform-cont">
            <Platforms />
          </div>
        </div>
      </section>
    </HomeRenderer>
  );
};

export default Home;

const HomeRenderer = styled.div`
  display: flex;
  width: 100%;
  height:fit-content;
  position: relative;

  .header-cont {
    flex: 94;
  }

  .icon-tray-cont {
    flex: 5;
  }

  section {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 5px;
    top: 70px;
    left:0;
  }

  .chart_cumulation,
  .order_platform {
    width:100%;
    display: flex;
    flex-direction: row;
    padding: 5px;
    gap: 20px;
  }
  .chart-cont{
margin-left:15px;
  }
  .chart-cont,
  .order-cont {
    flex: 60;
    border-radius: 12px;
    border: 1px solid #ededed;
    padding: 5px;
  }
  .platform-cont {
    border: 1px solid #ededed;
    border-radius: 12px;
  }
  .platform-cont,.cumulation-cont {
    flex: 40;
  }
  @media (max-width: 767px) {
    .chart_cumulation {
      flex-direction: column;
    }

    .cumulation-cont {
      margin-bottom:10px;
    }

    .order_platform {
      flex-direction: column;
      width: 100%;
      gap: 10px;
    }
  }
`;
