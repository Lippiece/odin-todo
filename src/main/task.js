import { css } from "@emotion/css";

const backgroundLow = "hsla(15 100% 5% / 50%)",
	backgroundMedium = "hsla(15 100% 15% / 50%)",
	backgroundHigh = "hsla(15 100% 25% / 50%)",
	taskStyle = css( {
		position      : "relative",
		display       : "flex",
		justifyContent: "space-between",
		gap           : "1em",
		flexDirection : "row",
		alignItems    : "center",
		padding       : "1em",
		borderRadius  : "0.5em",
		width         : "calc(100%)",
		// width          : "calc(fit-content + 3em)",
		maxWidth  			 : "100%",
		height        : "calc(fit-content + 3em)",
		"&:hover"     : { boxShadow: "0 0 0.2em 0.2em hsla(15 100% 50% / 50%)" },
	} ),
	taskContentStyle = css( {
		display      : "flex",
		gap          : "0.1em",
		flexDirection: "column",
		alignItems   : "flex-start",
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
		cursor             : "pointer",
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
	taskPriorityLow = css( {
		backgroundColor: backgroundLow,
		color          : "hsla(15 100% 60% / 75%)",
	} ),
	taskPriorityMed = css( {
		backgroundColor: backgroundMedium,
		color      				: "hsla(15 100% 75% / 80%)",
	} ),
	taskPriorityHigh = css( {
		backgroundColor: backgroundHigh,
		color          : "hsla(15 100% 87% / 80%)",
	} ),
	taskPriorityStyle = {
		"low": ( task ) =>
		{
			task.classList.remove( taskPriorityMed, taskPriorityHigh );
			task.classList.add( taskPriorityLow );
		},
		"medium": ( task ) =>
		{
			task.classList.remove( taskPriorityLow, taskPriorityHigh );
			task.classList.add( taskPriorityMed );
		},
		"high": ( task ) =>
		{
			task.classList.remove( taskPriorityLow, taskPriorityMed );
			task.classList.add( taskPriorityHigh );
		},
		"default": () => {},
	},
	removeButtonStyle = css( {
		appearance: "none",
		border    : "none",
		background: "none",
		fontSize  : "2.5em",
		color     : "inherit",
		flexShrink: "0",
		cursor    : "pointer",
		"&:hover" : { filter: "drop-shadow(0 0 0.1em hsla(15 100% 47% / 80%))" },
	} ),
	prioritizerStyle = css( {
		position     : "absolute",
		left         : "calc(50% - 3em)",
		top          : 0,
		width        : "6em",
		height       : "1em",
		display      : "flex",
		flexDirection: "row",
		gap          : "0.1em",
		cursor       : "pointer",
	} ),
	priorityBoxStyleDefault = css( {
		borderRadius: "0.5em",
		width      	: "100%",
		height      : "100%",
		"&:hover"   : { filter: "drop-shadow(0 0 0.1em hsla(15 100% 25% / 80%))" },
	} );

function initializePrioritizer( task )
{
	const prioritizer = document.createElement( "span" ),
		priorityBoxes = [ "low", "medium", "high" ];

	prioritizer.classList.add( prioritizerStyle );
	prioritizer.title = "Priority";
	for ( const priority of priorityBoxes )
	{
		const priorityBox = document.createElement( "span" ),
			priorityBoxStyle = {
				"low"   : () => ( priorityBox.classList.add( taskPriorityLow ) ),
				"medium": () => ( priorityBox.classList.add( taskPriorityMed ) ),
				"high"  : () => ( priorityBox.classList.add( taskPriorityHigh ) ),
			};

		priorityBox.classList.add( priorityBoxStyleDefault );
		priorityBoxStyle[ priority ]();
		priorityBox.addEventListener( "click", ( event ) =>
		{
			event.stopPropagation();
			taskPriorityStyle[ priority ]( task );
		} );
		prioritizer.append( priorityBox );
	}

	return prioritizer;
}
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
				"default": () => { this.makeEditable( element ) },
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
	initializeRemoveButton( task )
	{
		const removeButton = new TaskSubElement( "button", "", removeButtonStyle, task ),
			removeButtonIcon = document.createElement( "span" );

		removeButtonIcon.classList.add( "iconify" );
		removeButtonIcon.dataset.icon = "ci:delete-row";
		removeButton.append( removeButtonIcon );
		removeButton.title = "Remove task";
		removeButton.addEventListener( "click", ( event ) =>
		{
			event.stopPropagation();
			task.remove();
		} );
	}
	addToDOM( container )
	{
		const task = document.createElement( "div" ),
			_check      = new TaskSubElement( "input", undefined, checkStyle, task ),
			taskContent = new TaskSubElement( "div", undefined, taskContentStyle, task ),
			_title        = new TaskSubElement( "h3", this.title, titleStyle, taskContent );

		this.initializeRemoveButton( task );
		( taskPriorityStyle[ this.priority ] || taskPriorityStyle.default )( task );
		task.classList.add( taskStyle );
		task.addEventListener( "click", () =>
		{
			if( taskContent.lastChild.tagName === "H3" )
			{ const _description = new TaskSubElement( "p", "Description", descriptionStyle, taskContent ) }
			else
			{ taskContent.lastChild.classList.toggle( css( { display: "none" } ) ) }
		} );
		taskPriorityStyle[ this.priority ]( task );
		task.append( initializePrioritizer( task ) );
		container.prepend( task );

		return task;
	}
	constructor( { title, description, priority, container, list } )
	{
		this.title       = title;
		this.description = description;
		this.priority    = priority || "low";
		this.list        = list;

		return this.addToDOM( container );
	}
}
export function createTask( { title, description, priority, container, list } )
{
	return new Task( {
		title,
		description,
		priority,
		container,
		list,
	} );
}