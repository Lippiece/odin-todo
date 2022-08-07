import { css } from "@emotion/css";

const taskStyle = css( {
		display        : "flex",
		flexDirection  : "row",
		padding        : "1rem",
		borderRadius   : "0.5rem",
		width          : "calc(100% - 3em)",
		height         : "calc(fit-content + 3em)",
		// boxShadow      : "0 0 0.5rem rgba(255,100,50,1)",
		backgroundColor: "hsla(15 100% 5% / 50%)",
	} ),
	titleStyle = css( {
		display      : "inline-block",
		verticalAlign: "top",
		lineHeight   : "normal",
		fontSize     : "1.5em",
		fontWeight   : "bold",
	} );
export class Task
{
	addToDOM( container )
	{
		const task = document.createElement( "div" ),
			icon = document.createElement( "div" ),
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
		icon.dataset.icon = "flat-color-icons:medium-priority";
		icon.classList.add( "iconify" );
		icon.dataset.width = "2em";
		title.classList.add( titleStyle );
		title.textContent = this.title;
		// title.prepend( icon );
		task.classList.add( taskStyle );
		task.append( icon, title );
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