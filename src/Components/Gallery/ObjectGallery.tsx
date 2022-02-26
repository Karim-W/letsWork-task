import React, { useState } from 'react'
import store, { fetchImages, InitImages } from '../../Store/store'
import Pagination from '../Common/Pagination'
import SearchBar from '../Common/SearchBar'
import GalleryDialog from './GalleryDialog'
import GalleryItem from './GalleryItem'
export default function ObjectGallery() {
    const [skip, setSkip] = useState(0)
    const [take, setTake] = useState(10)
    const [images, setImages] = useState(store.getState())
    const [totalPages, setTotalPages] = useState(0)
    const goToPage = (pageNumber: number) => {
        setSkip(pageNumber * take)
    }
    React.useEffect(() => {
        store.subscribe(() => {
            setImages(fetchImages(skip, take))
            setTotalPages(Math.ceil(store.getState().length / take))
        })
        InitImages()
    }, [])
    React.useEffect(() => {
        setImages(fetchImages(skip, take))
    }, [skip])
    const handleSearch = (search: string) => {
        let fetchedImages = fetchImages(0, take, search)
        setImages(fetchedImages)
        search !== '' ? setTotalPages(Math.ceil(fetchedImages.length / take)) : setTotalPages(Math.ceil(store.getState().length / take))
    }
    return (
        <div className='2xl:mx-[14rem] xl:mx-[10rem] md:mx-[5rem] sm:mx-[2rem] xs:mx-[2rem] xxs:mx-[1rem] h-full py-4 lg:py-[2rem] 2xl:py-[4rem]'>
            <div className='w-full flex flex-col gap-4 mt-12'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='text-2xl xl:text-4xl font-semibold text-[#3078ff]'>
                        Gallery
                    </div>
                    <div>
                        <GalleryDialog />
                    </div>
                </div>
                <SearchBar search={handleSearch} />
                {images.length > 0 ? <div className='w-full grid grid-cols-1 md:grid-cols-3 retina:grid-cols-4 UHD:grid-cols-5 gap-[1rem]'>
                    {images.sort().map((image) => {
                        return <GalleryItem
                            key={image.id}
                            dateAdded={image.dateAdded}
                            id={image.id}
                            img={image.img}
                            text={image.text}
                            lastUpdated={image.lastUpdated}
                        />
                    })}
                </div> : <div className='w-full flex flex-row justify-center items-center'>
                    no galleries found.
                </div>}
                <Pagination
                    take={take}
                    skip={skip}
                    goToPage={goToPage}
                    total={totalPages}
                />
            </div>
        </div>
    )
}
