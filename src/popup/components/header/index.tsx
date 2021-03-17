import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import { Add, List } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export const Header = ({ height = 64 }) => {
  const history = useHistory();
  return (
    <AppBar style={{ height }}>
      <Toolbar style={{ minHeight: height }}>
        <Grid container justify="space-between">
          <Grid container item xs={6} alignContent="center">
            <Grid item>
              <Typography variant="h6">Chrome拡張</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            <Grid item>
              <IconButton color="inherit" onClick={() => history.push("/")}>
                <Add />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={() => history.push("/list")}>
                <List />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;