import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";
import { Details } from "../index";
import "./NewsCard.css";

function NewsCard({
    imageUrl,
    alt,
    description,
    title,
    channel,
    published,
    urlNews,
    author,
}) {
    return (
        <Card className="card">
            <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />

            <Card.Body className="h-100 d-flex flex-column ">
                <Card.Title>{title?.slice(0, 30) + "..."}</Card.Title>
                <Card.Text className="card-description">
                    {description?.slice(0, 60) + "..."}
                </Card.Text>
                <div className=" d-flex flex-column justify-content-between h-100 flex-grow-1">
                    {" "}
                    <Details channel={channel} published={published} author={author} />
                    <Button className="card-btn" href={urlNews} target="_blank">
                        Read more{" "}
                        <FaArrowRightLong
                            className="arrow-icon ms-1"
                            size={24}
                            color="#fff"
                        />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default NewsCard;
