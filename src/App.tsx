import React, { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Header } from "./components/header";
import { BookForm } from "./components/book-form";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { BookList } from "./components/book-list";
import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  header: {
    height: 50,
  },
  content: {
    marginTop: 60,
    padding: 12,
  },
});

function App() {
  const classes = useStyles();
  const storage = new LocalStorage();
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const localStorageRecords = await storage.getAll();
      const books = localStorageRecords.map((record) => {
        const key = Object.keys(record)[0];
        return Book.parse(record[key]);
      });
      setBooks(books);
    };
    fetchData();
  });

  const submitBook = async (newBook: Book) => {
    await storage.set(newBook.isbn, newBook.toString());
    setBooks([...books, newBook]);
  };
  const deleteBook = async (targetBook: Book) => {
    await storage.remove(targetBook.isbn);
    setBooks(books.filter((book) => book.isbn !== targetBook.isbn));
  };

  return (
    <BrowserRouter>
      <Container className={classes.root}>
        <Header height={50} />
        <Container className={classes.content}>
          <Switch>
            <Route exact path="/">
              <BookForm onSubmit={submitBook} />
            </Route>
            <Route exact path="/list">
              <BookList books={books} onDelete={deleteBook} />
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
