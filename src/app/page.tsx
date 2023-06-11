import RouteButton from '@/components/RouteButton';

export default function Home() {
	return (
		<div>
			<div>
				<RouteButton route='/login'>
					Login
				</RouteButton>
			</div>
			<div>
				<RouteButton route='/signup'>
					Signup
				</RouteButton>
			</div>
		</div>
	)
}
