import { useStore } from "@nanostores/react";
import { $Stories } from "@Stores/Stories.store";
import UploadSection from "@Apps/uploadSection/UploadSection";
import DesktopView from "./desktopView/DesktopView";
import MobileView from "./mobileView/MobileView";


export default function MainApp() {
    const { isUpload, isMobile } = useStore($Stories);

    return (
        isUpload ? (isMobile ? <MobileView /> : <DesktopView />) : <UploadSection />
    )
}
