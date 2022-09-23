import Image from 'next/image'

export default function Graphic({data, colour}) {

    // Loop through top channels array
    let channels = data.channels
    let topChannels = null
    if (channels != undefined){
        topChannels = channels.map((item,index)=>{
            return <li key={index}>{item}</li>
        })
    }

    return (
        <div className={`flex flex-col w-screen md:w-max primary`}>

            {/* Top Bar */}
            <div className={`flex flex-row w-full h-12 px-6 items-center justify-between text-base md:text-2xl secondary`}> 
                <div className={`primary w-4 h-4 md:w-6 md:h-6 rounded-full`} />
                <div className={`primary w-4 h-4 md:w-6 md:h-6 rounded-full invisible md:visible`} />
                <div className={`primary w-4 h-4 md:w-6 md:h-6 rounded-full`} />
                <div className={`primary w-4 h-4 md:w-6 md:h-6 rounded-full invisible  md:visible`} />
                <div className={`primary w-4 h-4 md:w-6 md:h-6 rounded-full`} />
                <h1 className="font-bold text-right">YouTube Wrapped</h1>
            </div>

            {/* Top Section Content */}
            <div className="flex flex-row w-max mt-6 mx-8 gap-6 md:gap-12 items-center">
                <div className="relative w-40 h-40 md:w-64 md:h-64 drop-shadow-xl"><Image src={data.image} layout="fill" priority/></div>
                <div className="flex flex-col gap-8 text-lg md:text-3xl">
                    <p> Videos Watched <br/> <span className="font-bold text-2xl md:text-4xl"> { data.videosWatched } </span></p>
                    <p> Minutes Watched <br/> <span className="font-bold text-2xl md:text-4xl"> { data.minsWatched } </span></p>
                </div>
            </div>

            {/* Bottom Section Content */}
            <div className="flex flex-row items-center gap-12 pt-6 pb-8 mx-8 text-xs leading-7 md:text-2xl md:leading-9"> 
                <div className="w-1/2 truncate">
                    <h1 className="text-lg md:text-2xl font-bold"> Top Channels </h1>
                    <ul> {topChannels} </ul>
                </div>

            <div className="flex flex-col text-lg md:text-3xl w-1/2 font-bold">
                <p> Comments <br/><span className="text-lg md:text-3xl font-normal"> { data.comments } </span></p>
                <p> Videos Liked <br/><span className="text-lg md:text-3xl font-normal"> { data.liked } </span></p>
                <p> Total Searches <br/><span className="text-lg md:text-3xl font-normal"> { data.searches } </span></p>
            </div>
         </div>
        <style jsx>{`
        .primary {
            background-color: ${colour[0]};
            color: ${colour[1]};
        }

        .secondary {
            background-color: ${colour[1]};
            color: ${colour[0]};
        }
        `}</style>
    </div>
    )
}