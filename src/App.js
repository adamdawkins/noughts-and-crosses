import React from 'react';
import { reduce, pipe, map, prop, curry } from 'ramda';
import './App.css';

// helpers 

const combine = curry((a, b) => x => ( <div>{a(x)} {b(x)}</div>))

const combineComponents = (...args) => {
	console.log('combineComponents', { args })
	const [first, ...rest] = args

	return reduce((acc, c) => combine(acc, c), first, rest)
}



// State / Data
const getTitle = prop('title')
const getRows = prop('rows')

const state = {
	title: 'Noughts and crosses',
	rows: [
		['', 'O', ''],
		['', 'X', ''],
		['', 'O', ''],
	]
}

// components / UI
const Header = title => <h1>A Dawk Game: {title}</h1>
const Footer = () => <p>I don't know what I'm doing</p>
const Cell = (value) => <td>{value}</td>
const Row = cells =>( 
	<tr>
		{map(Cell, cells )}
	</tr>
)
const Board = rows => (
	<table>
		<tbody>
			{rows}
		</tbody>
	</table>
)

// Enhanced components
const GameBoard = pipe(
	getRows,
	map(Row),
	Board,
)
const GameHeader = pipe(
	getTitle,
	Header
)

/* combineComponents is equivalent to passing all props down to each component, spread
 * On the one hand, combineComponents is a bit more DRY, you're not adding {...props} everywhere.
 * On the other, it generates an extra div per component, and arguably spreading {...props} is more familiar, and thus easier to understand.
 *
 * This is basically all about global state management, I think.
 */

const App = combineComponents(
	GameHeader,
	GameBoard,
	Footer,
)

// const App = props => (
// 	<div>
// 		<GameHeader {...props} />
// 		<GameBoard {...props} />
// 		<Footer {...props} />
// 	</div>
// )

export {
	App,
	state
}
