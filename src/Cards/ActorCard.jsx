import { Link } from "react-router-dom"


const ActorCard = ({ data }) => {
    const imageActor = () => {
        if(data.profile_path === null) {
            return(<img 
            src={'https://img.freepik.com/foto-gratis/manos-sosteniendo-simbolo-multiplicar_53876-63742.jpg?w=740&t=st=1703722049~exp=1703722649~hmac=6c06ea299b9646e17c11a95e5c425f0adf9837547a8425241ccf271d56544df0'} 
            alt={data.original_name} 
            className="inline-block rounded-t-md h-full w-full"/>
            )
        } else {
            return (<img 
            src={`https://image.tmdb.org/t/p/w185${data.profile_path}`} 
            alt={data.original_name} 
            className="inline-block rounded-t-md h-full w-full"/>
            )
        }
    }
    return (
        <Link className="scroll-ml-5 snap-start mx-6" to={`https://en.wikipedia.org/wiki/${data.original_name}`}>
            {imageActor()}
            <div className="bg-white rounded-b-md px-1 pt-1 pb-2">
                <p className="font-bold">{data.original_name.length !== 0 ? data.original_name : '-' }</p>
                <p className='text-xs'>{data.character.length !== 0 ? data.character : '-' }</p>
            </div>
        </Link>
    )
}

export { ActorCard }