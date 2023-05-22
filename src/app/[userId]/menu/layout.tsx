// export default async function Layout(props: { children: React.ReactNode, leagueModal: React.ReactNode; }) {
export default async function Layout({ children }: { children: React.ReactNode; }) {
	return(
		<>
			{ children }
			{/* { props.leagueModal } */}
		</>
	) 
}