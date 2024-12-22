import { useSelector } from "react-redux";
import { Container, Header, card } from "./index";
import { Col, Row } from "react-bootstrap";
import { header, capitaLize } from "../../utils/config";
import { NewsCard } from "../index";
import Loading from "../Loading/Loading";
import "./News.css";
import NoDataFound from "../NoDataFound/NoDataFound";
import moment from "moment";

function News({ personalized, handleShowSidebar }) {
    const personalizedClass = personalized ? "personalized" : "";

    let { articles, status, filters } = useSelector((state) => state.articles);
    articles = personalized ? personalized : articles;

    const heading = personalized ? "personalized" : (filters.query) ? filters.query : filters.category;

    const openOptions = () => {
        handleShowSidebar();
    };
    return (
        <>
            {status === "loading" ? (
                <Loading />
            ) : personalized && articles.length < 1 ? (
                <>
                    <div className="notify-container" onClick={openOptions}>
                        <span className="">
                            Click here or above Button to select options for Personalized News
                        </span>
                    </div>
                </>
            ) : (
                <Container className={personalizedClass}>
                    <Header>{header(capitaLize(heading))}
                        <div className=" fs-6 text-gray fw-light"> {moment().format('LL')}  </div>
                    </Header>
                    {articles?.length < 1 ? (
                        <NoDataFound />
                    ) : (

                        <Row>
                            {articles.map((element, index) => {
                                return (
                                    <Col sm={12} md={6} lg={4} xl={3} style={card} key={index}>
                                        <NewsCard
                                            title={element.title}
                                            description={element.description}
                                            published={element.publishedAt}
                                            channel={element.source}
                                            alt="News image"
                                            publishedAt={element.publishedAt}
                                            imageUrl={element.imgSrc}
                                            urlNews={element.url}
                                            author={element.author}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    )}
                </Container>
            )}
        </>
    );
}

export default News;
