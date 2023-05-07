import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
// used for keywords searches via google
// note: should not manually add <head> tags, instead refer to metadata API

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
	return (
		<html lang="en">
			<body>
				{ children /* children refers to page (and nested ui), then html around defines this layout */ } 
			</body>
		</html>
	)
}
