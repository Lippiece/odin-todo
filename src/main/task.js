import { css } from "@emotion/css";
export class Task
{
	addToDOM( container )
	{
		const task = document.createElement( "div" ),
			taskStyle = css( {
				display        : "flex",
				flexDirection  : "column",
				justifyContent : "center",
				alignItems     : "center",
				margin         : "1rem",
				padding        : "1rem",
				borderRadius   : "0.5rem",
				// boxShadow      : "0 0 0.5rem rgba(255,100,50,1)",
				backgroundColor: "hsla(15 100% 5% / 50%)",
			} );

		task.classList.add( taskStyle );
		task.append( this.title, this.description, this.priority );
		container.append( task );
	}
	constructor( { title, description, priority, container } )
	{
		this.title       = title;
		this.description = description;
		this.priority    = priority;
		this.container   = container;
		this.addToDOM( this.container );
	}
}