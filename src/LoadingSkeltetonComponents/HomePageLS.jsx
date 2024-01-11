import { MovieCardLS } from "./MovieCardLS"
import { CategoryCardLS } from "./CategoryCardLS"

const HomePageLS = () => {
    return (
        <div className='max-w-6xl m-auto'>
            <div className="flex justify-between w-full py-4 items-center px-[55px] animate-pulse">
                <p className="bg-slate-700 w-[185.39px] h-[40px] rounded-md"></p>
                <p className="w-[86.67px] h-[36px] bg-slate-700 animate-pulse rounded-md"></p>
            </div>
            <div className="flex items-center h-[322px] justify-center gap-3 pt-3">
                <MovieCardLS/>
                <MovieCardLS/>
                <MovieCardLS/>
                <MovieCardLS/>
                <MovieCardLS/>
            </div>
            <div className="w-full pl-[55px] pt-12">
                <p className=" py-2 w-[135px] h-[32px] bg-slate-700 animate-pulse rounded-md mb-5"></p>
                <div className="grid grid-cols-4 gap-4">
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                    <CategoryCardLS/>
                </div>
            </div>
        </div>
    )
}

export { HomePageLS }