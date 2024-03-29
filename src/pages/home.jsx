import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid/";

import Scream from "../components/Scream";

export class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axios
      .get("/screams")
      .then((result) => {
        this.setState({
          screams: result.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    let recentScreamMarkup = this.state.screams ? (
      this.state.screams.map((scream) => {
        return <Scream key={scream.screamId} scream={scream} />;
      })
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile..</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
