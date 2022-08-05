import  { css } from "@emotion/css";
import { Task } from "./task.js";
import { TaskList } from "./task-list.js";
import backgroundUrl from "./background.webp";

const content = document.querySelector( "#content" ),
	contentStyle = css( {
		display         : "grid",
		gridTemplateRows: "1fr 10fr",
		flexDirection   : "column",
		justifyContent  : "center",
		alignItems      : "center",
		height          : "100vh",
		backgroundColor : "#222",
		color           : "rgba(255,100,50,0.75)",
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
	todos = document.createElement( "div" ),
	todosStyle = css( {
		display            : "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
		gridTemplateRows   : "repeat(auto-fit, minmax(100px, 1fr))",
		justifyContent     : "center",
		alignItems         : "center",
		width              : "100%",
		height             : "100%",
	} );

content.classList.add( contentStyle );
content.prepend( nav );
nav.classList.add( navStyle );
main.classList.add( mainStyle );
head.classList.add( headStyle );
head.append( titleText );
todos.classList.add( todosStyle );
main.append( head, todos );
		display       : "flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
	} ),
	li = document.createElement( "li" ),
	liStyle = css( {
		width   : "100%",
		height  : "2rem",
		fontSize: "1rem",
		border  : "1px solid #000",
	} );

content.classList.add( contentStyle );
main.classList.add( mainStyle );
title.classList.add( titleStyle );
title.append( titleText );
input.classList.add( inputStyle );
button.classList.add( buttonStyle );
button.append( buttonText );
ul.classList.add( ulStyle );
li.classList.add( liStyle );
main.append( title );