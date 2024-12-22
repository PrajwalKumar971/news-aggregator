import React from "react";
import './Loading.css';
function Loading() {
    return (
        <div className="is-loading ">
            <div className="walking">
                <div className="head"></div>
                <div className="body"></div>
                <div className="firstLeg"></div>
                <div className="secondLeg"></div>
                <div className="shadow"></div>
            </div>
            <h5 className="text-white">Hey News readers wait a minute</h5>
        </div>


    );
}

export default Loading;
