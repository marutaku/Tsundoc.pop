import { Button, Container, Grid, TextField, CircularProgress, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect } from "react";
import { Book } from "../../../lib/models/book";
import { http, HttpResponse } from "../../../lib/models/http";

interface BookFormProps {
  onSubmit: (book: Book) => void;
}

interface NounList {
  nouns: string;
}

export const BookForm = ({ onSubmit }: BookFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [authorsString, setAuthors] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async () => {
    setIsSaving(true);

    const obj = {"title": title};
    const request: Request = new Request(
        "https://tsundoc-pop-idclo2e3ea-an.a.run.app/nouns",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    let response: HttpResponse<NounList>;
    let nouns: any;
    try {
      response = await http<NounList>(request);
      console.log("res", response.parsedBody);
      nouns = response.parsedBody?.nouns;
    } catch(response) {
      console.log("error", response);
      nouns = "";
    }

    const authors = authorsString.split("／著");
    onSubmit(new Book(title, isbn, authors, image, nouns));
    setTitle("");
    setIsbn("");
    setAuthors("");
    setImage("");
    setIsSaving(false);
    setOpen(true);

  };
  // useEffectでうまくやりたかったけど時間なかった
  const fetchBookInfo = () => {
    setIsSearching(true);
    const baseUrl: string = 'https://api.openbd.jp/v1/get?isbn=';
    fetch(baseUrl + isbn)
      .then(response => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          setIsSearching(false);
          return response.json();
          })
    .then(data => {
      setTitle(data[0].summary.title);
      setAuthors(data[0].summary.author);
      setImage(data[0].summary.cover);
        })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        });
  }
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
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            label="ISBNコード"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={10}>
          <Button color="primary" onClick={fetchBookInfo}>
            { isSearching ? <CircularProgress /> : '検索' }
          </Button>
        </Grid>
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
            value={authorsString}
            onChange={(e) => setAuthors(e.target.value)}
            label="著者"
            placeholder="複数人の場合はカンマ区切り"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={10}>
          <img src={image} style={{ width: "80%" }} />
        </Grid>
        <Grid item xs={10}>
          <Button color="primary" onClick={handleSubmit}>
            { isSaving ? <CircularProgress /> : '保存' }
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="保存しました"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
            </IconButton>
            </React.Fragment>
        }
      />
    </Container>
  );
};
