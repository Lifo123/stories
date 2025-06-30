import { useStore } from "@nanostores/react";
import { $InterfaceControl, $Stories } from "@Stores/index"
import Controls from "./Controls";
import MusicLayer from "./MusicLayer";


export default function DesktopView() {
    const { isUpload, fileURL, fileType } = useStore($Stories);
    const { musiclayer } = useStore($InterfaceControl);

    if (!isUpload) return null;

    return (
        <main className="h-full w-full f-row relative f-center">
            <Controls />
            <div className="aspect-[9/16] h-[98%] rounded-lg relative d-flex f-center o-hidden p-3">
                {
                    fileType === 'image' ? (
                        <>
                            <span
                                className="w-full h-full f-col f-center absolute z-0 no-select"
                                style={{
                                    backgroundImage: `url(${fileURL})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    filter: "blur(60px)",
                                    transform: "scale(1.2)",
                                }}
                            ></span>
                            <img src={fileURL} alt="Preview" className="w-full object-cover z-1 rounded-md" />
                        </>
                    ) : fileType === 'video' ?
                        (
                            <video
                                src={fileURL}
                                className="w-full object-cover z-1"
                                controls
                                autoPlay
                            />
                        ) : null
                }
                <MusicLayer />
            </div>
        </main>
    )
}
