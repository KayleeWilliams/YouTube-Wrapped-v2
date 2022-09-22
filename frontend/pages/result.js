import {useRouter, withRouter} from 'next/router'
import Link from 'next/link'
import Graphic from '../components/Graphic'
import IcBaselineArrowRight from '~icons/ic/baseline-arrow-right.jsx'
import IcBaselineArrowLeft from '~icons/ic/baseline-arrow-left.jsx'

// // Called on request
export async function getServerSideProps(context) {
	const data = context.query
	// If no data e.g. /result
	if (Object.keys(data).length === 0) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
	//  Return as prop
	return {
		props: {data},
  	}
}

export default function Result({data}) {

	return (
		<div className="snap-x snap-mandatory overflow-scroll flex h-screen w-screen scroll-smooth bg-background ">
			<div id="1" className="flex flex-shrink-0 snap-start snap-normal flex-col items-end lg:flex-row lg:items-center justify-center w-screen h-screen"> 
				<Graphic primary="bg-[#f74854] text-[#fdeb1f]" secondary="bg-[#fdeb1f] text-[#f74854]" data={data} /> 
				<div className="flex flex-row w-full lg:w-fit justify-center"> 
					<Link href="#2" scroll={true} replace><IcBaselineArrowRight className="text-link hover:text-on transition ease-in-out delay-100 duration-150 hover:-translate-y-1 hover:scale-150 w-32 h-32 lg:w-64 lg:h-64" /></Link>
				</div>			
			</div>          

			<div id="2" className="flex flex-shrink-0 snap-start snap-normal flex-col items-end lg:flex-row lg:items-center justify-center w-screen h-screen"> 
				<Link href="#1" scroll={true} replace><IcBaselineArrowLeft className="text-link hover:text-on transition ease-in-out delay-100 duration-150 hover:-translate-y-1 hover:scale-150 w-0 h-0 lg:w-64 lg:h-64 invisible lg:visible" /></Link>
				<Graphic primary="bg-[#dd92ca] text-[#4e3775]" secondary="bg-[#4e3775] text-[#dd92ca]" data={data} />     
				<div className="flex flex-row w-full lg:w-fit justify-center"> 
					<Link href="#1" scroll={true} replace><IcBaselineArrowLeft className="text-link hover:text-on transition ease-in-out delay-100 duration-150 hover:-translate-y-1 hover:scale-150 w-32 h-32 lg:w-0 lg:h-0" /></Link>
					<Link href="#3" scroll={true} replace><IcBaselineArrowRight className="text-link hover:text-on transition ease-in-out delay-100 duration-150 hover:-translate-y-1 hover:scale-150 w-32 h-32 lg:w-64 lg:h-64" /></Link>
				</div>
			</div>      

			<div id="3" className="flex flex-shrink-0 snap-start snap-normal flex-col items-end lg:flex-row lg:items-center justify-center w-screen h-screen"> 
				<Link href="#2" scroll={true} replace><IcBaselineArrowLeft className="text-link hover:text-on transition ease-in-out delay-100 duration-150 hover:-translate-y-1 hover:scale-150 w-0 h-0 lg:w-64 lg:h-64 invisible lg:visible" /></Link>
				<Graphic primary="bg-[#5163b3] text-[#e7f453]" secondary="bg-[#e7f453] text-[#5163b3]" data={data} />     		
				<div className="flex flex-row w-full lg:w-fit justify-center"> 
					<Link href="#2" scroll={true} replace><IcBaselineArrowLeft className="text-link hover:text-on transition ease-in-out delay-100 duration-150 hover:-translate-y-1 hover:scale-150 w-32 h-32 lg:w-0 lg:h-0" /></Link>
				</div>
			</div>       
		</div>
	)

}
