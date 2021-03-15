import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";

interface BookFormProps {
  onSubmit: (s1: string, s2: string) => void;
}

export const BookForm = ({ onSubmit }: BookFormProps) => {
  const [bookName, setBookName] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  return (
    <Container>
      <Grid
        container
        justify="space-between"
        alignContent="center"
        direction="column"
        spacing={4}
      >
        <Grid item xs={10}>
          <TextField
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            label="書籍名"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            label="ISBNコード"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={10}>
          <Button color="primary" onClick={() => onSubmit(bookName, isbn)}>保存</Button>
        </Grid>
      </Grid>
    </Container>
  );
};
