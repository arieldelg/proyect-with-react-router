import { useEffect, useState } from "react"


const useLocalStorage = (initialName, InitialValue) => {
    const [items, setItems] = useState([])
    
    useEffect(() => {
        let movieItems;
        const myLocalStorage = localStorage.getItem(initialName)
        if (!myLocalStorage) {
            localStorage.setItem(initialName, JSON.stringify(InitialValue))
            movieItems = InitialValue
        } else {
            movieItems = JSON.parse(myLocalStorage)
        }
        setItems(movieItems)
    }, [])

    const saveMovietoFavorites = (data) => {
        localStorage.setItem(initialName, JSON.stringify(data))
        setItems(data)
    }

    const deleteMovieFromFavorites = (id) => {
        const newItem = [...items]
        const index = newItem.findIndex(element => element.id === id)
        newItem.splice(index, 1)
        localStorage.setItem(initialName, JSON.stringify(newItem))
        setItems(newItem)
    }
    return { items, saveMovietoFavorites, deleteMovieFromFavorites }
}

export { useLocalStorage }