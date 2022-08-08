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
	main = document.querySelector( "main" ),
	mainStyle = css( {
		width         : "95vw",
		height        : "90%",
		display       : "flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
	} ),
	head = document.createElement( "h1" ),
	headStyle = css( {
		fontSize  : "4em",
		fontWeight: "bold",
	} ),
	titleText = document.createTextNode( "To Do app" ),
	nav = document.createElement( "nav" ),
	navStyle = css( {
		display       : "flex",
		flexDirection : "row",
		justifyContent: "space-around",
		alignItems    : "center",
		width         : "100%",
		height        : "100%",
	} ),
	listsContainerStyle = css( {
		display            : "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
		gridTemplateRows   : "repeat(auto-fit, minmax(150px, 1fr))",
		width              : "100%",
		height             : "100%",
		marginTop          : "2em",
		gap                : "2em",
	} );
export const listsContainer = document.createElement( "div" );

body.classList.add( bodyStyle );
content.classList.add( contentStyle );
content.prepend( nav );
nav.classList.add( navStyle );
main.classList.add( mainStyle );
head.classList.add( headStyle );
head.append( titleText );
listsContainer.classList.add( listsContainerStyle );
main.append( head, listsContainer );
const taskList1 = new TaskList( "List 1" );

taskList1.addTask( new Task( {
	title      : "Task 1",
	description: "Task 1 description",
	priority   : "low",
	container  : taskList1.tasksContainer,
} ) );
taskList1.addTask( new Task( {
	title      : "Task 2",
	description: "Task 2 description",
	priority   : "medium",
	container  : taskList1.tasksContainer,
} ) );
const taskList2 = new TaskList( "List 2" );

taskList2.addTask( new Task( {
	title      : "Task 1",
	description: "Task 1 description",
	priority   : "high",
	container  : taskList2.tasksContainer,
} ) );
taskList2.addTask( new Task( {
	title      : "Task 2",
	description: "Task 2 description",
	priority   : "high",
	container  : taskList2.tasksContainer,
} ) );