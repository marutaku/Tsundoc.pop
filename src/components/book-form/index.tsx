import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Book } from "../../lib/models/book";

interface BookFormProps {
  onSubmit: (book: Book) => void;
}

export const BookForm = ({ onSubmit }: BookFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const handleSubmit = () => onSubmit(new Book(title, isbn));
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <Button color="primary" onClick={handleSubmit}>
            保存
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
