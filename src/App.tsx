import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Header from "./components/header";
import { BookForm } from "./components/book-form";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    // maxWidth: 1000,
    minHeight: 300,
    // maxHeight: 1000,
  },
  header: {
    height: 50,
  },
  content: {
    marginTop: 80,
    padding: 12,
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Header height={50} />
      <Container className={classes.content}>
        <BookForm onSubmit={console.log} />
      </Container>
    </Container>
  );
}

export default App;
