import { css } from "@emotion/css";

const taskStyle = css( {
		display        : "flex",
		flexDirection  : "row",
		alignItems     : "center",
		padding        : "1em",
		borderRadius   : "0.5em",
		width          : "calc(100% - 3em)",
		height         : "calc(fit-content + 3em)",
		backgroundColor: "hsla(15 100% 5% / 50%)",
		"&:hover"      : { boxShadow: "0 0 0.2em 0.2em hsla(15 100% 50% / 50%)" },
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
	taskPriorityStyle = {
		"medium": ( task ) => ( task.classList.add( css ( { backgroundColor: "hsla(15 100% 15% / 55%)" } ) ) ),
		"high"  : ( task ) => ( task.classList.add( css ( {
			backgroundColor: "hsla(15 100% 25% / 60%)",
			color          : "hsla(15 100% 87% / 80%)",
		}
				 ) ) ),
		"default": () => {},
	};
export class TaskSubElement
{
	constructor( type, text, classList, parent )
	{
		const element = document.createElement( type ),
			typeCheker = {
				"INPUT": () =>
				{
					element.type    = "checkbox";
					element.checked = false;
				},
				"H3": () =>
				{
					element.contentEditable = true;
				},
				"default": () => {},
			};

		element.textContent = text;
		element.classList.add( classList );
		parent.append( element );
		( typeCheker[element.tagName] || typeCheker.default )();
	}
}
export class Task
{

	addToDOM( container )
	{
		const task = document.createElement( "div" ),
			_check = new TaskSubElement( "input", undefined, checkStyle, task ),
			_title = new TaskSubElement( "h3", this.title, titleStyle, task ),
			controller  = new AbortController();

		( taskPriorityStyle[ this.priority ] || taskPriorityStyle.default )( task );
		task.classList.add( taskStyle );
		task.addEventListener( "click", () =>
		{
			const _description = new TaskSubElement( "p", this.description || "Description", undefined, task );

			controller.abort();
		}, { signal: controller.signal } );
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