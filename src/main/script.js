import  { css } from "@emotion/css";
import { Task } from "./task.js";
import { TaskList } from "./task-list.js";
import backgroundUrl from "./background.webp";

const content = document.querySelector( "#content" ),
	contentStyle = css( {
		fontFamily      : "Rubik",
		display         : "grid",
		gridTemplateRows: "1fr 10fr",
		flexDirection   : "column",
		justifyContent  : "center",
		alignItems      : "center",
		minHeight       : "100vh",
		// backgroundColor : "#222",
		backgroundImage : `url(${ backgroundUrl })`,
		color           : "hsla(15 100% 60% / 75%)",
	} ),
	main = document.querySelector( "main" ),
	mainStyle = css( {
		width         : "75vw",
		height        : "100%",
		display       : "flex",
		flexDirection : "column",
		// gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
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
	todosStyle = css( {
		display            : "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
		gridTemplateRows   : "repeat(auto-fit, minmax(100px, 1fr))",
		justifyContent     : "center",
		alignItems         : "center",
		width              : "100%",
		height             : "100%",
	} );
export const todos = document.createElement( "div" );

content.classList.add( contentStyle );
content.prepend( nav );
nav.classList.add( navStyle );
main.classList.add( mainStyle );
head.classList.add( headStyle );
head.append( titleText );
todos.classList.add( todosStyle );
main.append( head, todos );
const taskList1 = new TaskList( "List 1" );

taskList1.addTask( new Task( {
	title      : "Task 1",
	description: "Task 1 description",
	priority   : "low",
	container  : taskList1.container,
} ) );
taskList1.addTask( new Task( {
	title      : "Task 2",
	description: "Task 2 description",
	priority   : "medium",
	container  : taskList1.container,
} ) );
const taskList2 = new TaskList( "List 2" );

taskList2.addTask( new Task( {
	title      : "Task 1",
	description: "Task 1 description",
	priority   : "high",
	container  : taskList2.container,
} ) );
taskList2.addTask( new Task( {
	title      : "Task 2",
	description: "Task 2 description",
	priority   : "high",
	container  : taskList2.container,
} ) );