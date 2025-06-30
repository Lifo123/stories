import Icons from "@Components/Icons";
import SpotifyCards from "@Components/SpotifyCards";
import { useStore } from "@nanostores/react";
import { $InterfaceControl } from "@Stores/index";

interface MusicLayerProps {

}

export default function MusicLayer() {
    const { musiclayer } = useStore($InterfaceControl);

    return (
        <div className={`h-full w-full d-flex absolute z-50 p-3 ${!musiclayer.isOpen ? 'no-select' : ''}`} onClick={(e) => {
            e.stopPropagation();
            $InterfaceControl.setKey("musiclayer.isOpen", false);
        }}>
            <div className="w-full h-max f-row justify-between">
                <div className="f-row gap-3 h-max pointer-events-auto">
                    <Icons icon="music" size={26} />
                    <span className="pointer" onClick={() => $InterfaceControl.setKey("musiclayer.isMute", !musiclayer.isMute)}>
                        <Icons icon={musiclayer.isMute ? 'volumeMute' : 'volumeUp'} size={26} />
                    </span>
                </div>
                <Icons icon="adjustment" size={26} />
            </div>
            <SpotifyCards type="simple" />
        </div>
    )
}