import { useStore } from "@nanostores/react";
import { $InterfaceControl, $Stories } from "@Stores/index";
import React from "react";

interface SpotifyCardsProps {
    type: 'simple' | 'card' | 'circular';
}

export default function SpotifyCards(props: SpotifyCardsProps) {
    const CARD = useStore($Stories)?.spotifyCard;

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
                    src={CARD?.album?.images[1]?.url}
                    alt="cover image"
                    className="h-full w-full rounded-xs object-cover d-flex f-center"
                />
            </span>
            <div className="f-col mr-2 no-select">
                <span className="fs-custom-14-5 text-black" style={{ fontWeight: 530 }}>{CARD?.name}</span>
                <span className="fs-custom-14-5 fw-300 text-black">{CARD?.artists[0]?.name}</span>
            </div>
        </div>
    )
}