import Image from 'next/image'

export default function Graphic({data}) {

    // Loop through top channels array
    let channels = data.channels
    let topChannels = null

    if (channels != undefined){
        topChannels = channels.map((item,index)=>{
            return <li key={index}>{item}</li>
            console.log(topChannels)
        })
    }

    return (
        <div className="flex flex-col bg-pink-300 text-pink-900 w-2/5">

            {/* Top Bar */}
            <div className="flex flex-row w-full h-12 px-6 items-center justify-between text-2xl text-pink-300 bg-pink-900"> 
                <div className="w-6 h-6 rounded-full bg-pink-300" />
                <div className="w-6 h-6 rounded-full bg-pink-300" />
                <h1 className="font-bold text-center">YouTube Wrapped</h1>
                <div className="w-6 h-6 rounded-full bg-pink-300" />
                <div className="w-6 h-6 rounded-full bg-pink-300" />
            </div>

            {/* Top Section Content */}
            <div className="flex flex-row w-max mt-6 mx-8 gap-12 items-center">
                <div className="relative w-60 h-60 drop-shadow-xl"><Image src={data.image} layout="fill" /></div>
                <div className="flex flex-col gap-8 text-3xl">
                    <p> Videos Watched <br/> <span className="font-bold text-4xl"> { data.videosWatched } </span></p>
                    <p> Minutes Watched <br/> <span className="font-bold text-4xl"> { data.minsWatched } </span></p>
                </div>
            </div>

            {/* Bottom Section Content */}
            <div className="flex flex-row items-center gap-12 pt-6 pb-8 mx-8 text-2xl leading-9"> 
                <div className="w-1/2 truncate">
                    <h1 className="font-bold"> Top Channels </h1>
                    <ul> {topChannels} </ul>
                </div>

            <div className="flex flex-col text-3xl w-1/2 font-bold">
                <p> Comments <br/><span className="font-normal"> { data.comments } </span></p>
                <p> Videos Liked <br/><span className="font-normal"> { data.liked } </span></p>
                <p> Total Searches <br/><span className="font-normal"> { data.searches } </span></p>
            </div>
            </div>
        </div>
    )
}