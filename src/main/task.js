import { css } from "@emotion/css";

const taskStyle = css( {
		display        : "flex",
		gap            : "1em",
		flexDirection  : "row",
		alignItems     : "center",
		padding        : "1em",
		borderRadius   : "0.5em",
		width          : "calc(100%)",
		// width          : "calc(fit-content + 3em)",
		maxWidth   			 : "100%",
		height         : "calc(fit-content + 3em)",
		backgroundColor: "hsla(15 100% 5% / 50%)",
		"&:hover"      : { boxShadow: "0 0 0.2em 0.2em hsla(15 100% 50% / 50%)" },
	} ),
	taskContentStyle = css( {
		display       : "flex",
		gap           : "0.1em",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "flex-start",
	} ),
	titleStyle = css( {
		display   : "inline-block",
		alignSelf : "center",
		lineHeight: "150%",
		fontSize  : "1.5em",
		fontWeight: "bold",
		maxWidth 	: "7em",
	} ),
	checkStyle = css( {
		appearance         : "none",
		flexShrink         : "0",
		display            : "grid",
		placeItems         : "center",
		verticalAlign      : "top",
		width              : "2.5em",
		height             : "2.5em",
		margin             : "0.5em",
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
	} ),
	descriptionStyle = css( {
		display   : "inline-block",
		alignSelf : "center",
		lineHeight: "150%",
		fontSize  : "1em",
		overflow  : "auto",
		maxWidth 	: "10em",
	} ),
	taskPriorityStyle = {
		"medium": ( task ) => ( task.classList.add( css ( {
			backgroundColor: "hsla(15 100% 15% / 55%)",
			color      				: "hsla(15 100% 75% / 80%)",
		} ) ) ),
		"high": ( task ) => ( task.classList.add( css ( {
			backgroundColor: "hsla(15 100% 25% / 60%)",
			color          : "hsla(15 100% 87% / 80%)",
		} ) ) ),
		"default": () => {},
	};
export class TaskSubElement
{
	makeEditable( element )
	{
		element.contentEditable = true;
		element.addEventListener( "click", ( event ) =>
		{ event.stopPropagation() } );
	}
	constructor( type, text, classList, parent )
	{
		const element = document.createElement( type ),
			typeCheker = {
				"INPUT": () =>
				{
					element.type    = "checkbox";
					element.checked = false;
					element.addEventListener( "click", ( event ) =>
					{ event.stopPropagation() } );
				},
				"H3": () =>
				{
					this.makeEditable( element );
				},
				"P": () =>
				{
					this.makeEditable( element );
				},
				"default": () => {},
			};

		element.textContent = text;
		element.classList.add( classList );
		parent.append( element );
		( typeCheker[element.tagName] || typeCheker.default )();

		return element;
	}
}
export class Task
{

	addToDOM( container )
	{
		const task = document.createElement( "div" ),
			_check = new TaskSubElement( "input", undefined, checkStyle, task ),
			taskContent = new TaskSubElement( "div", undefined, taskContentStyle, task ),

		 _title = new TaskSubElement( "h3", this.title, titleStyle, taskContent );

		( taskPriorityStyle[ this.priority ] || taskPriorityStyle.default )( task );
		task.classList.add( taskStyle );
		task.addEventListener( "click", () =>
		{
			if( taskContent.lastChild.tagName === "H3" )
			{
				 const _description = new TaskSubElement( "p", "Description", descriptionStyle, taskContent );
			}
			else
			{ taskContent.lastChild.classList.toggle( css( { display: "none" } ) ) }
		} );
		container.prepend( task );
	}
	constructor( { title, description, priority, container } )
	{
		this.title       = title;
		this.description = description;
		this.priority    = priority;
		this.addToDOM( container );
	}
}