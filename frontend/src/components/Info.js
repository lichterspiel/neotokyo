import React, {useState, useEffect} from "react";
import { Grid, Button, Typography, IconButton} from "@material-ui/core";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { Link } from "react-router-dom";
import NavigateNext from "@material-ui/icons/NavigateNext";

const pages = {
	JOIN: "pages.join",
	CREATE: "pages.create",
};

export default function Info(props){
	const [page, setPage] = useState(pages.JOIN);

	function joinInfo(){
		return "Join page";
	}

	function createInfo(){
		return "Create page";
	}

	// same as component did mount or  add return after to emulate will unmount ...
	useEffect(() => {
		console.log("ran")
	});

	return (
		<Grid container align="center" spacing={1}>
			<Grid itme xs={12}>
				<Typography component="h4" variant="h4">
					What is NeoTokyo?
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="body1">{page === pages.JOIN ? joinInfo() : createInfo()}</Typography>
			</Grid>
			<Grid item xs={12}>
				<IconButton onClick={() => {page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE)}}>
					{page === pages.CREATE ?  <NavigateBefore/> : <NavigateNext/>}
				</IconButton>
			</Grid>
			<Grid item xs={12}>
				<Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
			</Grid>
		</Grid>
	);
}


