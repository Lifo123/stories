import React from "react"
import { $Search } from "@Stores/Search.store";
import { useStore } from "@nanostores/react";
import { $Stories } from "@Stores/Stories.store";



export default function Search() {
    const { searchResults } = useStore($Search);
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClose = (e: MouseEvent) => {
            const inputRef = document.querySelector('[data-input-search]');
            const target = e.target as Node;

            const clickedInsideInput = inputRef?.contains(target);
            const clickedInsideSearch = elementRef.current?.contains(target);

            if (clickedInsideInput || clickedInsideSearch) return;

            $Search.setKey('isSearchClicked', false);
        };

        window.addEventListener('pointerdown', handleClose);
        return () => {
            window.removeEventListener('pointerdown', handleClose);
        };
    }, []);


    return (
        <section className="absolute top-full left-1/2 bg-lifo-bg-secondary -translate-x-1/2 w-full mt-3 rounded-md min-h-[210px] p-2"
            ref={elementRef}
        >
            {searchResults.slice(0, 5).map((item, index) => (
                <CardList key={index} data={item} />
            ))}
        </section>
    )
}

const CardList = ({ item }: any) => {
    return (
        <div className="search-list-card f-row gap-4 f-align-center w-full p-2 hover:bg-lifo-bg-third rounded-md pointer" onClick={() => {
            let prev = $Stories.get();
            $Stories.set({
                ...prev,
                isUpload: true,
                fileURL: 'alst',
                fileType: 'spotify',
                file: null,
            })
        }}>
            <img
                src={item?.url || '/stories/menor3.webp'}
                alt="song cover image"
                className="size-12 rounded-sm object-cover d-flex f-center no-select ml-1"
            />
            <div className="f-col mr-2 no-select">
                <span className="fs-custom-14-5 fw-500">{item?.title || 'My Love i Think'}</span>
                <span className="fs-custom-14-5 fw-200">{item?.description || "There Will Be Blood"}</span>
            </div>
        </div>
    )
}