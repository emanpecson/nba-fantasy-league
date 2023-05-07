import '../globals.css'

export default function Layout({ children }: { children: React.ReactNode; }) {
	return(
		<div className="box">
			{ children }
		</div>
	)
}