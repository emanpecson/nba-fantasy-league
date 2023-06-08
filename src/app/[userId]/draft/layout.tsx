import React from "react";

export default async function Layout(props: {
	children: React.ReactNode,
	playerTable: React.ReactNode,
	pickOrder: React.ReactNode,
}) {
	return (
		<>
			{ props.children }
			{ props.playerTable }
			{ props.pickOrder }
		</>
	) 
}
