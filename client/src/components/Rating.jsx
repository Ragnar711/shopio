import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const getStarIcon = (value) => {
    if (value >= 1) {
        return <FaStar />;
    } else if (value >= 0.5) {
        return <FaStarHalfAlt />;
    } else {
        return <FaRegStar />;
    }
};

const Rating = ({ value, text }) => {
    return (
        <div className="rating">
            <span>{getStarIcon(value)}</span>
            <span>{getStarIcon(value - 1)}</span>
            <span>{getStarIcon(value - 2)}</span>
            <span>{getStarIcon(value - 3)}</span>
            <span>{getStarIcon(value - 4)}</span>
            <span className="rating-text">{text}</span>
        </div>
    );
};

export default Rating;
