import  { css } from "@emotion/css";
const content = document.querySelector( "#content" ),
	contentStyle = css( {
		display        : "flex",
		flexDirection  : "column",
		justifyContent : "center",
		alignItems     : "center",
		height         : "100vh",
		backgroundColor: "#222",
		color          : "rgba(255,100,50,0.75)",
	} ),
	main = document.querySelector( "main" ),
	mainStyle = css( {
		width         : "100%",
		height        : "100%",
		display       : "flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
	} ),
	title = document.createElement( "h1" ),
	titleStyle = css( {
		fontSize  : "2rem",
		fontWeight: "bold",
	} ),
	titleText = document.createTextNode( "To Do app" ),
	input = document.createElement( "input" ),
	inputStyle = css( {
		width       : "100%",
		height      : "2rem",
		fontSize    : "1rem",
		border      : "1px solid #000",
		borderRadius: "5px",
		marginBottom: "1rem",
	} ),
	button = document.createElement( "button" ),
	buttonStyle = css( {
		width       : "100%",
		height      : "2rem",
		fontSize    : "1rem",
		border      : "1px solid #000",
		borderRadius: "5px",
		marginBottom: "1rem",
	} ),
	buttonText = document.createTextNode( "Add task" ),
	ul = document.createElement( "ul" ),
	ulStyle = css( {
		width         : "100%",
		height        : "100%",
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