import Icons from "@Components/Icons";
import { useStore } from "@nanostores/react";
import { $InterfaceControl, $Stories } from "@Stores/index";
import { $Search } from "@Stores/Search.store";

interface ControlsProps {

}

export default function Controls() {

    return (
        <div className="h-full w-full d-flex absolute z-50 p-3 no-select">
            <div className="f-row w-full justify-between">
                <span
                    className="rounded-full pointer pointer-events-auto h-max"
                    onClick={() => {
                        $Stories.setKey("isUpload", false);
                        $Search.setKey('isUploading', false);
                    }}
                >
                <Icons icon="close" size={32} />
            </span>
        </div>
        </div >
    )
}