import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import { BookmarkIcon } from '@heroicons/react/24/solid'
const MovieCard = React.forwardRef(({ data, saveMovietoFavorites, items, deleteMovieFromFavorites }, ref) => {
    const navigate = useNavigate()
    const saveNewMovietoLocaleStorage = (id) => {
        const find = items.find(element => element.id === id)
        if (Boolean(find)) {
            deleteMovieFromFavorites(id)
        } else {
            const newItem = [...items, data]
            saveMovietoFavorites(newItem)
        }
    }
    const isOnFavorites = (id) => {
        const find = items?.find(element => element.id === id) 
        return Boolean(find)
    }
    const image = () => {
        let image;
        if(data.poster_path === null) {
            return image = 'https://img.freepik.com/vector-premium/icono-soluciones-empresariales-creativas-negocios-icono-simple-moviles-web_720607-10085.jpg?size=626&ext=jpg&ga=GA1.2.540609318.1703721195&semt=ais'
        } else {
            return image = `https://image.tmdb.org/t/p/w500/${data.poster_path}`
        }
    }

    
    if (ref) {
        return(
            <div ref={ref} className="w-[220px] relative hover:scale-105 ease-in-out duration-300">
                <LazyLoadImage 
                src={image()} 
                alt={data.original_title} 
                className="w-[220px] rounded-xl inline-block p-2 cursor-pointer"
                onClick={() => navigate(`/react-router-dom-V6.4/movie/${data.id}`)}
                aria-label={`The movie name is ${data.original_title}`}
                width={220}
                height={322}
                />
                <BookmarkIcon 
                className={`w-6 absolute top-3 right-3 cursor-pointer ${isOnFavorites(data.id) ? 'text-red-500' : 'text-white'}`}
                onClick={() => saveNewMovietoLocaleStorage(data.id)}
                />
            </div>
        )
    } else {
        return(
            <div className="w-[220px] relative hover:scale-105 ease-in-out duration-300">
                <LazyLoadImage 
                src={image()} 
                alt={data.original_title} 
                className="w-[220px] rounded-xl inline-block p-2 cursor-pointer"
                onClick={() => navigate(`/react-router-dom-V6.4/movie/${data.id}`)}
                aria-label={`The movie name is ${data.original_title}`}
                width={220}
                height={322}
                />
                <BookmarkIcon 

                className={`w-6 absolute top-3 right-3 cursor-pointer ${isOnFavorites(data.id) ? 'text-red-500' : 'text-white'}`}
                onClick={() => saveNewMovietoLocaleStorage(data.id)}
                />
            </div>
        )
    }

    
})

export { MovieCard }