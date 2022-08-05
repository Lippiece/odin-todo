import { css } from "@emotion/css";
import { todos } from "./script.js";

const containerStyle = css( {
		display       : "flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
	} ),
	addButtonStyle      = css( {
		fontSize       : "1.5em",
		marginTop      : "1em",
		marginBottom   : "1em",
		padding        : "0.5em",
		borderRadius   : "5px",
		border         : "1px solid #444",
		backgroundColor: "#333",
		color          : "#f63",
		cursor         : "pointer",
	} ),
	taskListHeaderStyle = css( {
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
		 addButton = document.createElement( "button" );

		header.classList.add( taskListHeaderStyle );
		header.textContent = this.title;
		container.classList.add( containerStyle );
		addButton.classList.add( addButtonStyle );
		addButton.classList.add( "iconify" );
		addButton.dataset.icon = "mdi:plus";
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