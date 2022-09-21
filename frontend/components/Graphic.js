import Image from 'next/image'

export default function Graphic(data) {
    return (
        <div className="flex flex-col bg-pink-300 w-2/5">

            {/* Top Bar */}
            <div className="flex flex-row w-full justify-between bg-pink-900"> 
                <h1 className="font-bold w-3/4 text-right">YouTube Wrapped</h1>
            </div>

            {/* Top Section Content */}
            <div className="flex flex-row w-max mt-6 mx-8 gap-12 items-center">
                <div className="relative w-60 h-60"><Image src={data.data.image} layout="fill" /></div>
                <div className="flex flex-col gap-8 text-3xl">
                    <p> Videos Watched <br/> <span className="font-bold text-4xl"> { data.data.videosWatched } </span></p>
                    <p> Minutes Watched <br/> <span className="font-bold text-4xl"> { data.data.minsWatched } </span></p>
                </div>
            </div>
        </div>
    )
}