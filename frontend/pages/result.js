import {useRouter, withRouter} from 'next/router'// const router = useRouter()
import Graphic from '../components/Graphic'

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
		<div className="bg-background w-screen h-screen">
			<Graphic data={data} />                
		</div>
	)

}
