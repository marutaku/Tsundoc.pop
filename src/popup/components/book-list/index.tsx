import {
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { Book } from "../../../lib/models/book";

export const BookList = ({
  books,
  onDelete,
}: {
  books: Book[];
  onDelete: (b: Book) => void;
}) => {
  return (
    <List>
      {books.length === 0 && (
        <Typography variant="subtitle1">本が登録されていません</Typography>
      )}
      {books.map((book, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>
              <BookIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={book.title}
            secondary={book.authors.join(",")}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(book)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
