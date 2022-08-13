import { css } from "@emotion/css";
import { listsContainer, taskLists } from "./main.js";
import { Task } from "./task.js";

const tasklistStyle = css( {
		display       : "flex",
		gap           : "1.5em",
		justifySelf 	 : "center",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
		width         : "fit-content",
		height        : "fit-content",
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
	addTask( task )
	{
		this.tasks.push( task );
		task.render( this.tasksContainer );
	}
	removeTask( task )
	{ this.tasks.splice( this.tasks.indexOf( task ), 1 ) }
	createButtons( taskList )
	{
		const buttonsContainer = document.createElement( "div" ),
			removeButton     = document.createElement( "button" ),
			removeButtonIcon = document.createElement( "span" ),
			addButton        = document.createElement( "button" ),
			addButtonIcon    = document.createElement( "span" );

		removeButton.append( removeButtonIcon );
		removeButton.title = "Remove list";
		removeButton.classList.add( buttonStyle );
		removeButtonIcon.classList.add( "iconify" );
		removeButtonIcon.dataset.icon = "gg:play-list-remove";
		removeButton.addEventListener( "click", () =>
		{
			taskList.remove();
			taskLists.splice( taskLists.indexOf( this ), 1 );
			localStorage.setItem( "taskLists", JSON.stringify( taskLists ) );
		} );
		this.initializeAddButton( addButton, addButtonIcon );
		buttonsContainer.classList.add( buttonsContainerStyle );
		buttonsContainer.append( removeButton, addButton );

		return buttonsContainer;
	}
	initializeAddButton( addButton, addButtonIcon )
	{
		addButton.append( addButtonIcon );
		addButton.title = "New task";
		addButton.classList.add( buttonStyle );
		addButtonIcon.classList.add( "iconify" );
		addButtonIcon.dataset.icon = "ci:add-row";
		addButton.addEventListener( "click", () =>
		{
			const newTask = new Task( {
				title        : "Task",
				taskListIndex: taskLists.indexOf( this ),
			 } );

			this.addTask( newTask );
			localStorage.setItem( "taskLists", JSON.stringify( taskLists ) );
		} );
	}
	render()
	{
		const tasksContainer = document.createElement( "div" ),
			taskList = document.createElement( "section" ),
			header   = document.createElement( "h2" );

		header.classList.add( headerStyle );
		header.textContent     = this.title;
		header.contentEditable = true;
		header.addEventListener( "input", () =>
		{ this.title = header.textContent } );
		tasksContainer.classList.add( tasklistStyle );
		taskList.classList.add( tasklistStyle );
		taskList.append( header, this.createButtons( taskList ), tasksContainer );
		listsContainer.append( taskList );
		this.tasksContainer = tasksContainer;
		// Render tasks
		for ( const task of this.tasks )
		{ task.render( tasksContainer ) }
	}
	constructor( title )
	{
		this.title = title;
		this.tasks = [];
	}
}
