import { css } from "@emotion/css";
import { listsContainer } from "./script.js";
import { Task } from "./task.js";

const tasklistStyle = css( {
		display       : "flex",
		gap           : "1em",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
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
	addTask( task ) { this.tasks.push( task ) }
	render()
	{
		const tasksContainer = document.createElement( "div" ),
			tasklist = document.createElement( "section" ),
			header    = document.createElement( "h2" ),
			addButton = document.createElement( "button" ),
		  addButtonIcon = document.createElement( "span" );

		header.classList.add( headerStyle );
		header.textContent = this.title;
		tasksContainer.classList.add( tasklistStyle );
		tasklist.classList.add( tasklistStyle );
		addButton.append( addButtonIcon );
		addButton.classList.add( addButtonStyle );
		addButtonIcon.classList.add( "iconify" );
		addButtonIcon.dataset.icon  = "ci:add-row";
		addButtonIcon.dataset.width = "2em";
		addButton.addEventListener( "click", () =>
		{
			this.addTask( new Task( {
				title    : `Task ${ this.tasks.length + 1 }`,
				container: this.tasksContainer,
			} ) );
		} );
		tasklist.append( header, addButton, tasksContainer );
		listsContainer.append( tasklist );
		this.tasksContainer = tasksContainer;
	}
	constructor( title )
	{
		this.tasks = [];
		this.title = title;
		this.render();
	}
}