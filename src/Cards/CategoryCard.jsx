import { useNavigate } from "react-router-dom"

const CategoryCard = ({ data }) => {
    const navigate = useNavigate()
    const bgColor = {
        28: 'bg-slate-800',
        12: 'bg-slate-700',
        16: 'bg-yellow-800',
        35: 'bg-blue-800',
        80: 'bg-red-800',
        99: 'bg-indigo-800',
        18: 'bg-green-800',
        10751: 'bg-gray-700',
        14: 'bg-purple-800',
        36: 'bg-pink-800',
        27: 'bg-purple-500',
        10402: 'bg-pink-500',
        9648: 'bg-green-600',
        10770: 'bg-yellow-500',
        53: 'bg-blue-500',
        10752: 'bg-red-500',
        37: 'bg-indigo-500',
        878: 'bg-indigo-200',
        10749: 'bg-purple-200',
    }
    return (
        <li onClick={() => navigate(`/proyect-with-react-router/${data.name}/${data.id}`)} 
            className='cursor-pointer list-none no-underline flex items-center gap-2 py-2'
            >
            <p className={`pr-4 no-underline ${bgColor[data.id]} w-6 h-6 rounded-lg`}></p>
            <p className="text-xl font-semibold">{data.name}</p>
        </li>
    )
}

export { CategoryCard }