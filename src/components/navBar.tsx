import React, { useState } from "react";
import styled from "styled-components";
import {
  IconBxChart,
  IconChevronLeft,
  IconChevronRight,
  IconCubeOutline,
  IconLayoutDashboard,
  IconLightUp,
  IconLogin,
  IconLogoutCircleLine,
  IconMoonFoggyFill,
  IconSetting,
  IconUsers,
} from "../assets/icons";
const NavBar = (): React.ReactElement => {
  const [activeNav, setActiveNav] = useState<string>("Dashboard");
  const [activeTheme, setActiveTheme] = useState<string>("Light");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentWidth, setCurrentWidth] = useState<string>('')

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if(isExpanded){
      setCurrentWidth('0px')
    }else{
      setCurrentWidth('70px')
    }}
   

  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
  };

  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
  };

  return (
    <NavBarRenderer style={{ width: currentWidth}}>
      <div className="nav_cont">
        
        <nav>
          <div className="nav-expander" onClick={toggleExpand}>
            {isExpanded ? <IconChevronLeft /> : <IconChevronRight />}
          </div>
          <span title="Dashboard" onClick={() => handleNavChange("Dashboard")}>
            <IconLayoutDashboard
              className={activeNav == "Dashboard" ? "active-nav" : "nav-icon"}
            />
          </span>
          <span title="Chart" onClick={() => handleNavChange("Chart")}>
            <IconBxChart
              className={activeNav == "Chart" ? "active-nav" : "nav-icon"}
            />
          </span>
          <span title="Users" onClick={() => handleNavChange("Users")}>
            <IconUsers
              className={activeNav == "Users" ? "active-nav" : "nav-icon"}
            />
          </span>
          <span title="Cube" onClick={() => handleNavChange("Cube")}>
            <IconCubeOutline
              className={activeNav == "Cube" ? "active-nav" : "nav-icon"}
            />
          </span>
          <span title="Setting" onClick={() => handleNavChange("Setting")}>
            <IconSetting
              className={activeNav == "Setting" ? "active-nav" : "nav-icon"}
            />
          </span>
          <div className="theme">
            <span
              title="Light"
              onClick={() => handleThemeChange("Light")}
              className={activeTheme == "Light" ? "Light" : ""}
            >
              <IconLightUp
                className={activeTheme == "Light" ? "active-theme" : "nav-icon"}
              />
            </span>
            <span
              title="Dark"
              onClick={() => handleThemeChange("Dark")}
              className={activeTheme == "Dark" ? "Dark" : ""}
            >
              <IconMoonFoggyFill
                className={activeTheme == "Dark" ? "active-theme" : "nav-icon"}
              />
            </span>
          </div>
        </nav>
      </div>

      <div className="nav-bottom">
        <span title="Checkin">
          <IconLogin className="nav-icon" />
        </span>

        <span title="Setting">
          <IconSetting className="nav-icon" />
        </span>

        <span title="checkout">
          <IconLogoutCircleLine className="nav-icon" />
        </span>
      </div>
    </NavBarRenderer>
  );
};

export default NavBar;

const NavBarRenderer = styled.div`
  height: 100%;
  border-right: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  position: fixed;
  transition:.3s ease-out;

  .nav-expander {
    position: absolute;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ededed;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: #fff;
    right: -27px;
    top: 11%;

  }

  @media (max-width: 767px) {
    .nav-expander {
      visibility: visible;
    }
  }
  .nav_cont {
    padding: 20px;
  }
 

  nav {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .nav-icon {
    height: 18px;
    width: 18px;
    cursor: pointer;
  }
  .active-nav {
    height: 18px;
    width: 18px;
    cursor: pointer;
    stroke: #39c9a0;
    fill: #39c9a0;
    position: relative;
  }
  .theme {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border: 1px solid #ededed;
    border-radius: 30px;
    padding: 5px;
    background-color: #ffffff;
  }

  .active-theme {
    height: 18px;
    width: 18px;
    cursor: pointer;
    stroke: #ffffff;
    fill: #ffffff;
  }
  .Light,
  .Dark {
    transition: 0.3s linear;
    background-color: #39c9a0;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #ededed;
  }

  .active-nav::after {
    content: "";
    position: absolute;
    height: 20px;
    width: 10px;
    background-color: #000;
  }

  .nav-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  @media(max-width:767px){
    .nav-icon {
    height: 16px;
    width: 16px;
  }
  }
`;
