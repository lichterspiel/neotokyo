import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();

    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
		this.renderSettingsButton = this.renderSettingsButton.bind(this);
		this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
  }

  getRoomDetails() {
    fetch("/api/get-room?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  renderSettings() {
    return <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <CreateRoomPage
          update={true}
          votesToSkip={this.state.votesToSkip}
          guestCanPause={this.state.guestCanPause}
          roomCode={this.roomCode}
					updateCallback={this.getRoomDetails}
        />
      </Grid>
      <Grid item xs={12}>
				<Button variant="contained" color="primary" onClick={ () => this.updateShowSettings(false)}>
          Back
				</Button>
			</Grid>
    </Grid>;
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  render() {
		if (this.state.showSettings)
		{
			return this.renderSettings();
		}
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Votes to skip: {this.state.votesToSkip.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            guest can pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
