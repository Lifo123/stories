import { $InterfaceControl } from "@Stores/index";
import React from "react";

interface SpotifyCardsProps {
    type: 'simple' | 'card' | 'circular';
}

export default function SpotifyCards(props: SpotifyCardsProps) {

    return (
        <div
            className={`spotify-card f-center absolute pointer`}
            data-type={props.type}
            onClick={() => {
                $InterfaceControl.setKey("musiclayer.isOpen", true);
            }}
        >
            <span className="f-col f-center size-12 rounded-md no-select">
                <img
                    src="#"
                    alt=""
                    className="h-full w-full rounded-xs object-cover d-flex f-center"
                />
            </span>
            <div className="f-col mr-2 no-select">
                <span className="fs-custom-14-5 text-black" style={{ fontWeight: 530 }}>Open Spaces</span>
                <span className="fs-custom-14-5 fw-300 text-black">There Will Be Blood</span>
            </div>
        </div>
    )
}