import  { css } from "@emotion/css";
import { Task } from "./task.js";
import { TaskList } from "./task-list.js";
import backgroundUrl from "./background.webp";

const body = document.querySelector( "body" ),
	bodyStyle = css( {
		 background    : `url(${ backgroundUrl })`,
		 display       : "grid",
		 justifyContent: "center",
		 alignItems    : "center",
	} ),
	content = document.querySelector( "#content" ),
	contentStyle = css( {
		fontFamily                  : "Rubik",
		width                       : "fit-content",
		minHeight                   : "100vh",
		// backgroundColor : "#222",
		color                       : "hsla(15 100% 60% / 75%)",
		"@media (max-width: 500px)" : { margin: "0 2vw" },
		"@media (min-width: 500px)" : { margin: "0 5vw" },
		"@media (min-width: 600px)" : { margin: "0 10vw" },
		"@media (min-width: 800px)" : { margin: "0 15vw" },
		"@media (min-width: 1000px)": { margin: "0 20vw" },
		"@media (min-width: 1200px)": { margin: "0 25vw" },
	} ),
	main      = document.querySelector( "main" ),
	mainStyle = css( {
		width         : "95vw",
		height        : "90%",
		display       : "flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
	} ),
	head      = document.createElement( "h1" ),
	headStyle = css( {
		fontSize  : "4em",
		fontWeight: "bold",
	} ),
	titleText          = document.createTextNode( "To Do app" ),
	newListButton      = document.createElement( "button" ),
	newListButtonStyle = css( {
		fontSize    : "3.5em",
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
	newListButtonIcon = document.createElement( "span" ),
	/* nav = document.createElement( "nav" ),
	   navStyle = css( {
	   display       : "flex",
	   flexDirection : "row",
	   justifyContent: "space-around",
	   alignItems    : "center",
	   width         : "100%",
	   height        : "100%",
	   } ), */
	listsContainerStyle = css( {
		display            : "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(190px, 300px))",
		gridTemplateRows   : "repeat(auto-fill, minmax(190px, fit-content))",
		justifyContent     : "center",
		alignItems         : "center",
		width              : "100%",
		height             : "100%",
		gap                : "5em",
	} );
export const listsContainer = document.createElement( "div" );

placeContent();
setStyles();
function placeContent()
{
	// content.prepend( nav );
	head.append( titleText );
	newListButton.append( newListButtonIcon );
	newListButtonIcon.dataset.icon = "fluent:text-bullet-list-add-20-filled";
	newListButtonIcon.classList.add( "iconify" );
	newListButton.addEventListener( "click", () =>
	{ const _taskList = new TaskList( "New List" ) } );
	newListButton.title = "New list";
	main.append( head, newListButton, listsContainer );
}
function setStyles()
{
	body.classList.add( bodyStyle );
	content.classList.add( contentStyle );
	main.classList.add( mainStyle );
	// nav.classList.add( navStyle );
	head.classList.add( headStyle );
	newListButton.classList.add( newListButtonStyle );
	listsContainer.classList.add( listsContainerStyle );
}
const taskList1 = new TaskList( "List 1" );