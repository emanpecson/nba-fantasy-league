// import '../globals.css' // maybe i don't have to import if already imported from root layout

export default function Layout({ children }: { children: React.ReactNode; }) {
	return(
		<div className="box">
			{ children }
		</div>
	)
}