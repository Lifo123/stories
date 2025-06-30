import React from "react";
import UI from "@lifo123/library/UI";
import { useStore } from "@nanostores/react";
import { $Stories, $Search } from "@Stores/index";

import Icons from "@Components/Icons";
import Search from "./Search";


export default function UploadBtn() {
    const { isUploading, isSearchClicked } = useStore($Search);
    const searchTimeout = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const prev = $Stories.get();
            $Stories.set({
                ...prev,
                isUpload: true,
                file: null,
                fileURL: e.clipboardData?.getData("text"),
                fileType: "image",
            });
        };

        window.addEventListener("paste", handlePaste);
        return () => {
            window.removeEventListener("paste", handlePaste)
        };
        ;
    }, [])

    async function handleUpload(file: File) {
        $Search.setKey('isUploading', true);
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            UI.toast.error("Solo se permiten imágenes o videos");
            $Search.setKey('isUploading', false);
            return;
        }

        const url = URL.createObjectURL(file);

        await new Promise((res) => setTimeout(res, 600));

        $Stories.set({
            ...$Stories.get(),
            isUpload: true,
            file,
            fileURL: url,
            fileType: isImage ? "image" : "video",
        });
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            $Search.setKey('searchText', value);
        }, 500);
    };

    return (
        <section className="f-col gap-4 f-center mb-10 px-3">
            <div className="bg-lifo-bg-secondary w-full h-12 px-2 f-row rounded-lg f-center relative">
                <input type="text" className="outline-none h-full ml-2 f-grow fs-custom-15"
                    placeholder="What do you want to play?"
                    onClick={() => $Search.setKey('isSearchClicked', true)}
                    data-input-search="true"
                    onChange={handleSearch}
                />
                <span className="size-11 pointer d-flex f-center">
                    <Icons icon="search" size={26} />
                </span>
                {isSearchClicked && <Search />}
            </div>

            <div className="border-dashed border bg-lifo-bg-secondary border-lifo-border rounded-xl p-4 f-col f-center gap-4 max-w-3xl">
                <label className="p-3 pointer btn-secondary br-6 mt-3 cursor-pointer text">
                    {isUploading ? 'Uploading...' : 'Upload'}
                    <input
                        type="file"
                        accept="image/*,video/*"
                        className="opacity-0 absolute w-0 h-0"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                        }}
                    />
                </label>
                <span className="fs-2">
                    Upload an image or Paste URL
                </span>
                <span className="fs-1 fw-400 mt-1 text-center">By uploading an image or URL you agree to our Terms of Use and Privacy Policy. </span>
            </div>
        </section>
    )
}