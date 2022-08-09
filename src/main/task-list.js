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
	buttonStyle      = css( {
		fontSize    : "2.5em",
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
	buttonsContainerStyle = css( {
		display       : "flex",
		gap           : "1em",
		justifyContent: "space-between",
		alignItems    : "center",
	} ),
	headerStyle = css( {
		fontSize  : "2.5em",
		fontWeight: "bold",
	} );
export class TaskList
{
	addTask( task ) { this.tasks.push( task ) }
	initializeButtons( taskList )
	{
		const buttonsContainer = document.createElement( "div" ),
			removeButton = document.createElement( "button" ),
			removeButtonIcon = document.createElement( "span" ),
			addButton = document.createElement( "button" ),
			addButtonIcon = document.createElement( "span" );

		removeButton.append( removeButtonIcon );
		removeButton.title = "Remove list";
		removeButton.classList.add( buttonStyle );
		removeButtonIcon.classList.add( "iconify" );
		removeButtonIcon.dataset.icon = "gg:play-list-remove";
		// removeButtonIcon.dataset.width = "0.95em";
		removeButton.addEventListener( "click", () =>
		{ taskList.remove() } );
		addButton.append( addButtonIcon );
		addButton.title = "New task";
		addButton.classList.add( buttonStyle );
		addButtonIcon.classList.add( "iconify" );
		addButtonIcon.dataset.icon = "ci:add-row";
		addButton.addEventListener( "click", () =>
		{
			this.addTask( new Task( {
				title    : `Task ${ this.tasks.length + 1 }`,
				container: this.tasksContainer,
			} ) );
		} );
		buttonsContainer.classList.add( buttonsContainerStyle );
		buttonsContainer.append( removeButton, addButton );

		return buttonsContainer;
	}
	render()
	{
		const tasksContainer = document.createElement( "div" ),
			taskList = document.createElement( "section" ),
			header    = document.createElement( "h2" );

		header.classList.add( headerStyle );
		header.textContent     = this.title;
		header.contentEditable = true;
		tasksContainer.classList.add( tasklistStyle );
		taskList.classList.add( tasklistStyle );
		taskList.append( header, this.initializeButtons( taskList ), tasksContainer );
		listsContainer.append( taskList );
		this.tasksContainer = tasksContainer;
	}
	constructor( title )
	{
		this.tasks = [];
		this.title = title;
		this.render();
	}
}