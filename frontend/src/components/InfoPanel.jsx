import React, { useState } from "react";
import "./infoPanel.css";

const InfoPanel = (props) => {
    const [showInfoPanel, setShowInfoPanel] = useState(false);

    return (
        <div 
            className={`info-panel ${showInfoPanel && "isOpen"}`}
            onClick={() => setShowInfoPanel(!showInfoPanel)}>
            <div 
                className="show-button"
                onClick={() => setShowInfoPanel(!showInfoPanel)}>
                <div className={`${showInfoPanel ? "arrow-left" : "arrow-right"}`} />
                </div>
                <p className="panel-title">Centrality</p>
                <div className="centrality-scale">
                <div className="labels">
                    <p className="top">MAX</p>
                    <p className="bottom">MIN</p>
                </div>
                <div className="gradient" />
                </div>
                <p className="panel-title">Edges</p>
                <div className="edge-legend">
                <p>Taken</p>
                <div className="edge red"/>
                <p>Not Taken</p>
                <div className="edge blue"/>
            </div>
        </div>
    );
};

export default InfoPanel;