
const LayoutWatchProviderImg = ({ logo_path, provider_name}) => {
    return (
        <>
            <img src={`https://image.tmdb.org/t/p/original${logo_path}`} alt={provider_name} className="rounded-md"/>
        </>
    )
}

export { LayoutWatchProviderImg }