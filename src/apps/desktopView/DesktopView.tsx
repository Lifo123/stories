import { useStore } from "@nanostores/react";
import { $InterfaceControl, $Search, $Stories } from "@Stores/index"
import MusicLayer from "./MusicLayer";
import UI from "@lifo123/library/UI";
import UTIL from "@Utils/Index";
import Icons from "@Components/Icons";
import { storiesUtils } from "@Stores/Stories.store";


export default function DesktopView() {
    const { isUpload, fileURL, fileType } = useStore($Stories);
    const { musiclayer } = useStore($InterfaceControl);

    if (!isUpload) return null;

    return (
        <main className="h-[calc(100vh_-_18px)] w-full f-row relative f-center gap-4 px-3">
            <section className="aspect-[9/16] h-full max-h-screen rounded-lg relative d-flex f-center o-hidden p-3">
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
            </section>
            <section className="bg-lifo-bg-secondary rounded-lg f-col h-full p-3 min-w-lg">
                <div>
                    <span
                        className="rounded-full pointer pointer-events-auto h-max"
                        onClick={() => {
                            storiesUtils.close();
                        }}
                    >
                        <Icons icon="closeCircle" size={32} />
                    </span>
                </div>
                panelright
            </section>
        </main>
    )
}
