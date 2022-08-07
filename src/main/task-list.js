import { css } from "@emotion/css";
import { todos } from "./script.js";
import { Task } from "./task.js";

const containerStyle = css( {
		display       : "flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
		width         : "100%",
	} ),
	addButtonStyle      = css( {
		fontSize    : "1.5em",
		marginTop   : "0.5em",
		marginBottom: "0.5em",
		borderRadius: "5px",
		border      : "none",
		background  : "none",
		color       : "hsla(15 100% 60% / 75%)",
		cursor      : "pointer",
		":hover"    : {
			color     : "hsla(15 100% 60% / 100%)",
			background: "hsla(15 100% 80% / 10%)",
		},
	} ),
	headerStyle = css( {
		fontSize  : "2.5em",
		fontWeight: "bold",
	} );
export class TaskList
{
	addTask( task )
	{
		this.tasks.push( task );
	}
	addToDOM()
	{
		const container = document.createElement( "section" ),
			header    = document.createElement( "h2" ),
			addButton = document.createElement( "button" ),
		  addButtonIcon = document.createElement( "span" );

		header.classList.add( headerStyle );
		header.textContent = this.title;
		container.classList.add( containerStyle );
		addButton.append( addButtonIcon );
		addButton.classList.add( addButtonStyle );
		addButtonIcon.classList.add( "iconify" );
		addButtonIcon.dataset.icon  = "ci:add-row";
		addButtonIcon.dataset.width = "2em";
		addButton.addEventListener( "click", () =>
		{
			const task = new Task( {
				title: `Task ${ this.tasks.length + 1 }`,
				container,
			} );

			this.addTask( task );
			task.addToDOM();
		} );
		container.append( header, addButton );
		todos.append( container );
		this.container = container;
	}
	constructor( title )
	{
		this.tasks = [];
		this.title = title;
		this.addToDOM();
	}
}