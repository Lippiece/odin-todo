import { css } from "@emotion/css";

const taskStyle = css( {
		display        : "flex",
		flexDirection  : "row",
		padding        : "1rem",
		borderRadius   : "0.5rem",
		width          : "calc(100% - 3em)",
		height         : "calc(fit-content + 3em)",
		backgroundColor: "hsla(15 100% 5% / 50%)",
	} ),
	titleStyle = css( {
		display   : "inline-block",
		alignSelf : "center",
		lineHeight: "150%",
		fontSize  : "1.5em",
		fontWeight: "bold",
	} ),
	checkStyle = css( {
		appearance         : "none",
		display            : "grid",
		placeItems         : "center",
		verticalAlign      : "top",
		width              : "2.5em",
		height             : "2.5em",
		margin             : "0.5rem",
		borderRadius       : "5px",
		backgroundColor    : "hsla(15 100% 5% / 100%)",
		border             : "0.1em solid hsla(15 100% 100% / 70%)",
		// checked
		"&:checked::before": { transform: "scale(1)" },
		"&::before"        : {
			transform      : "scale(0)",
			display        : "inline-block",
			content        : "''",
			width          : "1.4em",
			height         : "1.4em",
			backgroundColor: "hsla(15 40% 50% / 100%)",
			borderRadius   : "5px",
		},
	} );
export class Task
{
	addToDOM( container )
	{
		const task = document.createElement( "div" ),
			check = document.createElement( "input" ),
			title = document.createElement( "h3" ),
			backgroundStyle = {
				"medium": () => ( task.classList.add( css ( { backgroundColor: "hsla(15 100% 15% / 55%)" } ) ) ),
				"high"  : () => ( task.classList.add( css ( {
					backgroundColor: "hsla(15 100% 25% / 60%)",
					color          : "hsla(15 100% 87% / 80%)",
				}
				 ) ) ),
				"default": () => {},
			};

		( backgroundStyle[ this.priority ] || backgroundStyle.default )();
		check.type = "checkbox";
		check.classList.add( checkStyle );
		title.classList.add( titleStyle );
		title.textContent = this.title;
		task.classList.add( taskStyle );
		task.append( check, title );
		task.addEventListener( "click", () => console.log( "clicked" ) );
		container.prepend( task );
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