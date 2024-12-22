/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { RiMenu3Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
    fetchArticles,
    setCategory,
    setDate,
    setQuery,
    setSource,
} from "../../store/slices/articlesSlice";
import { capitaLize, categories, sources } from "../../utils/config";
import "../NavBar/NavBar.css";
import { RxCross2 } from "react-icons/rx";
import { isMobile, isTablet } from "react-device-detect";
import CommonSearchBar from "./CommonSearchBar";

function NavBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;
    const isPagePersonalized = /\/personalized/.test(currentPath);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState(sources[0]);
    const [startDate, setStartDate] = useState(
        moment(new Date()).format("YYYY-MM-DD")
    );
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const isSearchButtonDisabled = searchInputValue.trim() === "";
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCollapsed(false);
        dispatch(setQuery(searchInputValue));
        dispatch(
            fetchArticles({
                query: searchInputValue,
                source: selected.key,
                date: startDate,
            })
        );
        setSearchInputValue("");
    };

    const handleSelectSource = (eventKey) => {
        const selectedSource = sources.find((source) => source.key === eventKey);
        setSelected(selectedSource);
        dispatch(setSource(selectedSource));
    };

    const handleSelectCategory = (eventKey) => {
        setIsCollapsed(false);
        const selectedCategory = categories.find(
            (category) => category === eventKey
        );
        setSelectedCategory(selectedCategory);
        dispatch(setCategory(selectedCategory));
    };

    const handleDateChange = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        setStartDate(formattedDate);
        dispatch(setDate(formattedDate));
    };

    useEffect(() => {
        dispatch(setSource(selected));
        dispatch(setDate(startDate));
        dispatch(setCategory(selectedCategory));
        dispatch(
            fetchArticles({
                query: searchInputValue,
                source: selected.key,
                category: selectedCategory,
                date: startDate,
            })
        );
        dispatch(setQuery(""));
    }, [dispatch, selected, selectedCategory]);

    const CommonLinks = () => {
        return (
            <div className={isMobile || isTablet ? "" : "d-flex justify-content-center"}>
                {isPagePersonalized ? (
                    <div id="basic-navbar-nav">
                        <Nav className={isMobile || isTablet ? "d-flex flex-column" : ""}>
                            <Nav.Link as={Link} to="/" className=" active">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/personalized" className=" active">
                                Personalized News
                            </Nav.Link>
                        </Nav>
                    </div>
                ) : (
                    <div id="basic-navbar-nav">
                        <Nav className={isMobile || isTablet ? "d-flex flex-column" : ""}>
                            <Nav.Link as={Link} to="/" className=" active">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/personalized" className=" active">
                                Personalized
                            </Nav.Link>

                            {categories.map((element, index) => (
                                <div
                                    className={`d-flex align-items-center cursor-pointer nav-link-path ${selectedCategory === element ? "active" : ""
                                        }`}
                                    key={index}
                                    eventKey={element}
                                    id="dropdown-basic-button"
                                    title={capitaLize(selectedCategory)}
                                    onClick={() => handleSelectCategory(element)}
                                >
                                    {capitaLize(element)}
                                </div>
                            ))}

                            <NavDropdown
                                id="dropdown-basic-button"
                                className=" active"
                                title={selected.name}
                                onSelect={handleSelectSource}
                            >
                                {sources.map((element, index) => (
                                    <NavDropdown.Item key={index} eventKey={element.key}>
                                        {element.name}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        </Nav>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className=" bg-dark px-3 py-2 position-sticky w-100 top-0 left-0 z-1">
            <div className=" flex-grow-1 d-flex align-items-center justify-content-between">
                <a className="nav-brand text-decoration-none text-white" href="/">
                    News
                </a>
                <div
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="cursor-pointer d-block d-lg-none"
                >
                    <RiMenu3Fill size={22} color="white" />
                </div>

                <div className={`sidebar ${isCollapsed ? "open" : ""}`}>
                    <div className="sidebar-content">
                        <div className="d-flex align-items-center justify-content-between">
                            Menus
                            <span
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className=" d-block d-lg-none"
                            >
                                <RxCross2 size={22} color="white" />
                            </span>
                        </div>

                        <CommonSearchBar
                            searchInputValue={searchInputValue}
                            setSearchInputValue={setSearchInputValue}
                            handleSubmit={handleSubmit}
                            isSearchButtonDisabled={isSearchButtonDisabled}
                            startDate={startDate}
                            handleDateChange={handleDateChange}
                        />

                        <div className="">
                            <CommonLinks />

                        </div>
                    </div>
                </div>
                {/* Overlay to close sidebar */}
                {isCollapsed && (
                    <div className="overlay" onClick={() => setIsCollapsed(false)}></div>
                )}
                <div className="d-none d-lg-block flex-grow-1">
                    {/* <CommonSearchBar /> */}
                    <CommonSearchBar
                        searchInputValue={searchInputValue}
                        setSearchInputValue={setSearchInputValue}
                        handleSubmit={handleSubmit}
                        isSearchButtonDisabled={isSearchButtonDisabled}
                        startDate={startDate}
                        handleDateChange={handleDateChange}
                    />

                </div>

            </div>

            <div className="d-none d-lg-block">
                <CommonLinks />
            </div>
        </div>
    );
}

export default NavBar;
