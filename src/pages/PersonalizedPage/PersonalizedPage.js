import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

import "./PersonalizedPage.css";
import { useDispatch, useSelector } from "react-redux";
import { News } from "../../components";
import {
    setPreferredAuthors,
    setPreferredCategories,
    setPreferredSources,
} from "../../store/slices/articlesSlice";

function PersonalizedPage() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const { articles } = useSelector((state) => state.articles);
    const [filters, setFilters] = useState({
        sources: [],
        authors: [],
        categories: [],
    });

    const handleCloseSidebar = () => setShow(false);
    const handleShowSidebar = () => setShow(true);

    const handleFilterChange = (type, value, dispatchAction) => {
        setFilters((prevFilters) => {
            const updatedFilter = prevFilters[type].includes(value)
                ? prevFilters[type].filter((item) => item !== value)
                : [...prevFilters[type], value];

            dispatch(dispatchAction(updatedFilter));
            return {
                ...prevFilters,
                [type]: updatedFilter,
            };
        });
    };

    const getUniqueValues = (key) => [...new Set(articles.map((article) => article[key]))];

    const uniqueSources = getUniqueValues("source");
    const uniqueAuthors = getUniqueValues("author");
    const uniqueCategories = getUniqueValues("category");

    const filteredArticles =
        filters.sources.length === uniqueSources.length
            ? articles
            : articles.filter(
                (article) =>
                    filters.sources.includes(article.source) ||
                    filters.authors.includes(article.author) ||
                    filters.categories.includes(article.category)
            );

    const renderCheckboxes = (items, type, dispatchAction) => (
        <Form className={`${type} checkbox-container`}>
            {items.map((item) => (
                <div key={`default-${item}`} className="mb-3">
                    <Form.Check
                        type="checkbox"
                        id={`default-${item}`}
                        label={item}
                        value={item}
                        checked={filters[type].includes(item)}
                        onChange={() => handleFilterChange(type, item, dispatchAction)}
                    />
                </div>
            ))}
        </Form>
    );

    return (
        <>
            <div
                className="mt-500"
                style={{
                    color: "#fff",
                    marginTop: "100px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button variant="primary" onClick={handleShowSidebar}>
                    Set Personalized News
                </Button>
            </div>
            <div>
                <News personalized={filteredArticles} handleShowSidebar={handleShowSidebar} />
                <Offcanvas show={show} onHide={handleCloseSidebar} variant="dark">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <h1>Personalized Filter</h1>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr />
                    <Offcanvas.Body>
                        <h4>Filter By Sources</h4>
                        {renderCheckboxes(uniqueSources, "sources", setPreferredSources)}
                        <hr />
                        <h4>Filter By Authors</h4>
                        {renderCheckboxes(uniqueAuthors, "authors", setPreferredAuthors)}
                        <hr />
                        <h4>Filter By Categories</h4>
                        {renderCheckboxes(uniqueCategories, "categories", setPreferredCategories)}
                    </Offcanvas.Body>
                    <hr />
                    <div className="offcanvas-footer">
                        <Button variant="primary" onClick={handleCloseSidebar}>
                            Close
                        </Button>
                    </div>
                </Offcanvas>
            </div>
        </>
    );
}

export default PersonalizedPage;
