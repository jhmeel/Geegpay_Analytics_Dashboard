import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  IconCalender,
  IconChevronDown1,
  IconChevronUp,
  IconNotificationsOff,
  IconNotificationsOutline,
  IconSearch,
} from "../assets/icons";
import logo from "../assets/logo.png";
import photo5 from "../assets/photo-2.avif";

export const Header = (): React.ReactElement => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionOpened, setIsSuggestionOpen] = useState<boolean>(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [modalActive, setModalActive] = useState<boolean>(false);

  const [notificationOn, setNotificationOn] = useState<boolean>(true);
  const toggleNotification = () => {
    setNotificationOn(!notificationOn);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && searchValue !== "") {
        handleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    setTimeout(() => {
      const dummySuggestions = [
        "Top platforms",
        "Last Orders",
        "Chart",
        "Profile",
        "Cummulations",
        "Order list",
      ];
      setSuggestions(
        dummySuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
      setIsSuggestionOpen(true);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      return;
    }
    const query: string = encodeURIComponent(trimmedValue);
    console.log(query);
  };

  const toggleModal = () => {
    setModalActive(!modalActive);
  };
  
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalActive(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSuggestionClickOutside = (e: MouseEvent) => {
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target as Node)
    ) {
      setIsSuggestionOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleSuggestionClickOutside);
    return () => {
      document.removeEventListener("click", handleSuggestionClickOutside);
    };
  }, []);

  return (
    <HeaderRenderer>
      <span title="Logo">
          <img className="logo" src={logo} alt="Logo" />
        </span>
      <div className="cont-1">
        <h3>Dashboard</h3>
        <div className="search-bar">
          <IconSearch className="h-icon search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleOnChange}
          />
        </div>
        <SuggestionRenderer ref={suggestionRef}>
          {suggestions.length > 0 && isSuggestionOpened && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </SuggestionRenderer>
      </div>

      <div className="cont-2" ref={modalRef}>
        <div className="date-cont">
          <IconCalender className="h-icon" />
          <span className="date">{new Date().toDateString()}</span>
        </div>

        <div className="notification" onClick={toggleNotification}>
          {notificationOn ? (
            <IconNotificationsOutline className="h-icon" />
          ) : (
            <IconNotificationsOff className="h-icon" />
          )}
        </div>

        <div className="user-mod" onClick={toggleModal}>
          <div className="user-avatar">
            <img src={photo5} />
          </div>
          <div className="user-details">
            <span className="username">Justin Bergson</span>
            <span className="user-email">jush@gmail.com</span>
          </div>
          {modalActive && (
              <div className="modal-user-details">
                <span className="modal-avatar">
                  <img src={photo5} />
                </span>
                <span className="modal-username">Justin Bergson</span>
                <span className="modal-email">justin@gmail.com</span>
              </div>
            )}

          <span>
            <IconChevronDown1 className="h-icon chevdown-icon" />
          </span>
        </div>
      </div>
    </HeaderRenderer>
  );
};

const HeaderRenderer = styled.div`
  width: 95%;
  height: 65px;
  border-bottom: 1px solid #ededed;
  display: flex;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content:center;
  flex: auto;
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  top: 0px;
  right: 0;
  gap:5px;

  .logo {
    height: auto;
    width: 30px;
    cursor:pointer;
  }
  .cont-1 {
    display: flex;
    flex-direction: row;
    flex: 55%;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .cont-1 h3 {
    margin: 0 5px 0 5px;
  }
  .cont-2 {
    flex: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 40px;
    position:relative;
  }

  .user-mod {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 5px 10px;
    border: 1px solid #ededed;
    gap: 15px;
    background-color: #fff;
    
  }
  .notification {
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 40px;
    border: 1px solid #ededed;
    background-color: #fff;
  }
  .date-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .date {
    font-size: 12px;
  }
  .user-avatar {
    height: 35px;
    width: 35px;
    border: 1px solid #ededed;
    border-radius: 50%;
    position: relative;
  }
  .user-avatar img {
    position: absolute;
    width: 35px;
    border-radius: 50%;
    height: 35px;
  }
  .user-details {
    display: flex;
    flex-direction: column;
  }
  .user-details span {
    font-size: 12px;
    line-height: 18px;
  }
  .user-email {
    color: #8b8e98;
  }
  .h-icon {
    height: 18px;
    width: 18px;
    cursor: pointer;
  }
  .search-bar {
    position: relative;
  }
  .search-bar input {
    width: 280px;
    height: 40px;
    border-radius: 20px;
    padding: 10px 10px 10px 30px;
    background-color: #f3f3f4;
    border: 2px solid #ededed;
    z-index: 1;
    display: flex;
  }
  .search-bar input:focus{
    outline:none;
  }
  .search-icon {
    position: absolute;
    z-index: 9;
    top: 24%;
    left: 10px;
    stroke: grey;
  }

  .chevdown-icon {
    height: 16px;
    width: 16px;
  }
  ::placeholder {
    color: #8b8e98;
  }


  .modal-user-details {
    position: absolute;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #ededed;
   top:40px;
   cursor: pointer;
  
  }
  .modal-username {
    font-size: 13px;
  }
  .modal-email {
    font-size: 10px;
    color: grey;
  }

  .modal-avatar img {
    width: 30px;
    border-radius: 50%;
    height: 30px;
    cursor: pointer;
  }
`;

export const XmHeader = (): React.ReactElement => {
  const [notificationOn, setNotificationOn] = useState<boolean>(true);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionOpened, setIsSuggestionOpen] = useState<boolean>(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const toggleNotification = () => {
    setNotificationOn(!notificationOn);
  };

  const toggleModal = () => {
    setModalActive(!modalActive);
  };
  
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalActive(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && searchValue !== "") {
        handleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    setTimeout(() => {
      const dummySuggestions = [
        "Top platforms",
        "Last Orders",
        "Chart",
        "Profile",
        "Cummulations",
        "Order list",
      ];
      setSuggestions(
        dummySuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
      setIsSuggestionOpen(true);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      return;
    }
    const query: string = encodeURIComponent(trimmedValue);
    console.log(query);
  };

  const handleSuggestionClickOutside = (e: MouseEvent) => {
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target as Node)
    ) {
      setIsSuggestionOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleSuggestionClickOutside);
    return () => {
      document.removeEventListener("click", handleSuggestionClickOutside);
    };
  }, []);

  return (
    <XmHeaderRenderer>
      <span title="Logo">
          <img className="logo" src={logo} alt="Logo" />
        </span>
      <div className="xd-search-container">
        <input className="xd-checkbox" type="checkbox" />
        <div className="xd-search-mainbox">
          <div className="xd-search-iconContainer">
            <IconSearch className="xd-search_icon" />
          </div>
          <input
            className="xd-search_input"
            placeholder="search..."
            type="text"
            value={searchValue}
            onChange={handleOnChange}
          />
        </div>
      </div>

      <SuggestionRenderer ref={suggestionRef}>
        {suggestions.length > 0 && isSuggestionOpened && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </SuggestionRenderer>

      <div className="not_usermod_cont">
        <div className="notification" onClick={toggleNotification}>
          {notificationOn ? (
            <IconNotificationsOutline className="h-icon" />
          ) : (
            <IconNotificationsOff className="h-icon" />
          )}
        </div>

        <div className="user-mod" ref={modalRef}>
          <div className="user-avatar" onClick={toggleModal}>
            <img src={photo5} />
          </div>
          <span onClick={toggleModal}>
            {modalActive ? (
              <IconChevronUp className="h-icon chevdown-icon" />
            ) : (
              <IconChevronDown1 className="h-icon chevdown-icon" />
            )}

            {modalActive && (
              <div className="user-details">
                <span className="modal-avatar">
                  <img src={photo5} />
                </span>
                <span className="modal-username">Justin Bergson</span>
                <span className="modal-email">justin@gmail.com</span>
              </div>
            )}
          </span>
        </div>
      </div>
    </XmHeaderRenderer>
  );
};

const XmHeaderRenderer = styled.div`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ededed;
  display: flex;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  top: 0px;
  right: 0;
  padding-left: 10px;
  gap: 10px;
  .logo {
    height: auto;
    width: 30px;
    cursor:pointer;
  }
  .not_usermod_cont {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .xd-search {
    max-width: 200px;
  }

  .xd-search-container {
    position: relative;
    width: fit-content;
  }

  .xd-search-mainbox {
    box-sizing: border-box;
    position: relative;
    width: 180px;
    height: 35px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    border-radius: 160px;
    background-color: #f3f3f4;
    border: 1px solid #ededed;
    transition: all 0.3s ease;
  }

  .xd-checkbox:focus {
    border: none;
    outline: none;
  }

  .xd-checkbox:checked {
    right: 10px;
  }

  .xd-checkbox:checked ~ .xd-search-mainbox {
    width: 50px;
  }

  .xd-checkbox:checked ~ .xd-search-mainbox .xd-search_input {
    width: 0;
    height: 0px;
  }

  .xd-checkbox:checked ~ .xd-search-mainbox .xd-search-iconContainer {
    padding-right: 8px;
  }

  .xd-checkbox {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 17px;
    top: 10px;
    z-index: 9;
    cursor: pointer;
    appearance: none;
  }

  .xd-search_input {
    box-sizing: border-box;
    height: 100%;
    width: 140px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-bottom: 4px;
    padding-left: 5px;
    font-size: 13px;
    color: #000000;
    transition: all 0.3s ease;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  .xd-search_input:focus{
    outline:none;
  }
  .xd-search_input::placeholder {
    color: rgba(180, 180, 180, 0.776);
  }

  .xd-search-iconContainer {
    box-sizing: border-box;
    padding-top: 5px;
    width: fit-content;
    transition: all 0.3s ease;
  }

  .xd-search_icon {
    box-sizing: border-box;
    stroke: grey;
    height: 14px;
    width: 14px;
  }

  .notification {
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 40px;
    border: 1px solid #ededed;
    background:#fff;
  }
  .user-mod {
    display: flex;
    width: fit-content;
    background-color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 5px 10px;
    border: 1px solid #ededed;
    gap: 6px;
  }

  .user-avatar {
    height: 25px;
    width: 25px;
    border: 1px solid #ededed;
    border-radius: 50%;
    position: relative;
  }
  .user-avatar img {
    position: absolute;
    height: auto;
    border-radius: 50%;
    height: 25px;
    width: 25px;
  }

  .user-details {
    position: absolute;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #ededed;
    right: 10px;
  }
  .modal-username {
    font-size: 13px;
  }
  .modal-email {
    font-size: 10px;
    color: grey;
  }

  .modal-avatar img {

    width: 30px;
    border-radius: 50%;
    height: 30px;
    cursor: pointer;
  }
  .h-icon {
    height: 16px;
    width: 16px;
    cursor: pointer;
  }

  .chevdown-icon {
    height: 14px;
    width: 14px;
  }
`;

const SuggestionRenderer = styled.div`
  position: absolute;
  display: flex;
  left: 60%;
  background-color: #fff;
  bottom: 10px;

  .suggestions-list {
    margin: 5px;
    position: absolute;
    list-style: none;
    border-radius: 5px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    background: #fff;
  }

  @media(max-width:767px){
   &{
    left: 40px;
    }
  }
  .suggestion-item {
    padding: 5px 10px;
    font-size: 12px;
    color: #000;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  .suggestion-item:hover {
    background-color:#94f4d9;
    color: #fff;
  }

  .suggestion-item:first-child:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .suggestion-item:last-child:hover {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
