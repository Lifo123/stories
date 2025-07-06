import React from "react"
import { $Search, searchUtils } from "@Stores/Search.store";
import { useStore } from "@nanostores/react";
import { $Stories } from "@Stores/Stories.store";
import Icons from "@Components/Icons";
import { Skeleton } from "@lifo123/library";



export default function Search({ isVisible }: any) {
    const { searchResults, historyResults } = useStore($Search);

    const elementRef = React.useRef<HTMLDivElement>(null);

    const isVisibleClass = isVisible ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none';

    //HandleClose
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

    const list = searchResults.length ? searchResults : historyResults;
    const isSearch = searchResults.length ? false : true;
    if (!list.length) return null;


    return (
        <section
            className={`absolute top-full left-1/2 bg-lifo-bg-secondary -translate-x-1/2 w-full mt-3 rounded-md h-max p-2 ${isVisibleClass}`}
            ref={elementRef}
        >
            <div className="f-row gap-4 f-align-center justify-between w-full p-2 pt-2">
                <p className="m-0 px-1 fs-custom-14-5 fw-500 text-lifo-title">
                    {searchResults.length ? 'Resultados' : 'Búsquedas recientes'}
                </p>
            </div>
            {list.map((item: any, idx: number) => (
                <Card key={idx} data={item} isSearch={isSearch} isVisible={isVisible} />
            ))}

        </section>
    )
}

// Card.tsx
const Card = React.memo(({ data, isSearch, isVisible }: any) => {
    const { name: title = '—', artists, album } = data;
    const description = artists?.[0]?.name ?? 'Unknown artist';
    const url = album?.images?.[2]?.url ?? '';

    const [loaded, setLoaded] = React.useState(false);

    return (
        <div className={`search-list-card f-row gap-4 f-align-center w-full p-2 hover:bg-lifo-bg-third rounded-md ${isVisible ? 'pointer' : ''}`}
            onClick={async () => {
                await searchUtils.selectSong(data);
                
                $Search.set({
                    ...$Search.get(),
                    isFile: true,
                    isUploading: true,
                })
                $Stories.setKey('isUpload', true);
            }}
        >
            <span className="d-flex size-12">
                {!loaded && <Skeleton className="size-12 rounded-sm absolute" />}
                <img
                    src={url}
                    alt={`${title} cover image`}
                    className={`size-12 rounded-sm object-cover d-flex f-center no-select ${loaded ? '' : 'invisible'}`}
                    onLoad={() => setLoaded(true)}
                />
            </span>
            <div className="f-row no-select f-grow justify-between overflow-hidden w-90">
                <div className="f-col leading-snug w-85">
                    <span className="fs-3 fw-400  text-nowrap truncate block">{title}</span>
                    <span className="fs-2 fw-500 text-lifo-text truncate block">{description}</span>
                </div>
                {
                    isSearch && (
                        <span className="d-flex f-center mr-2 pointer" onClick={(e) => {
                            e.stopPropagation();
                            searchUtils.deleteSong(data.id);
                        }}>
                            <Icons icon="close" size={22} />
                        </span>
                    )
                }
            </div>
        </div>
    );
});
