import React from 'react'
import styled from 'styled-components'

export const TinaWordmark = styled(({ ...styleProps }, props) => {
	return (
		<a href='/' {...styleProps}>
			<h1>
				<svg
					viewBox='0 0 89 23'
					fill={`${props.color || 'black'}`}
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M0 0.195467V5.04958H6.51871V23H13.0703V5.04958H19.589V0.195467H0Z' />
					<path d='M39.423 23V18.1459H34.2212V5.04958H39.423V0.195467H22.4677V5.04958H27.6695V18.1459H22.4677V23H39.423Z' />
					<path d='M57.6722 13.2266C57.4088 12.2493 56.7833 10.881 56.059 9.77337L50.2316 0.195467H44.2068V23H50.1V14.5623C50.1 13.1289 50.0341 11.6303 49.9024 10.3924H50.495C50.9559 11.6629 51.5156 12.8031 52.0753 13.6827L57.9026 23H63.9934V0.195467H58.1002V8.79603C58.1002 10.2946 58.166 11.8584 58.2648 13.2266H57.6722Z' />
					<path d='M89 23V9.34986L81.3948 0H77.2137L69.5756 9.34986V23H75.8638V18.4717H82.7118V23H89ZM82.9751 10.7181V13.8782H75.6004V10.7181L78.9915 6.22238H79.5841L82.9751 10.7181Z' />
				</svg>
			</h1>
		</a>
	)
})`
	text-decoration: none;

	h1 {
		margin: 0;
	}

	svg {
		height: 40px;
		width: auto;
	}
`
