import { List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { Book } from "../../lib/models/book";

export const BookList = ({ books }: { books: Book[] }) => {
  return (
    <List>
      {books.length === 0 && (
        <Typography variant="subtitle1">本が登録されていません</Typography>
      )}
      {books.map((book, index) => (
        <ListItem key={index}>{book.title}</ListItem>
      ))}
    </List>
  );
};
