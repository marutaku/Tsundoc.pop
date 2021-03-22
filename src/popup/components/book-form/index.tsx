import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Book } from "../../../lib/models/book";
import { TinySegmenter } from "./tiny_segmenter-0.2.js";

interface BookFormProps {
  onSubmit: (book: Book) => void;
}

export const BookForm = ({ onSubmit }: BookFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [authorsString, setAuthors] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [wakati, setWakati] = useState<string>("");
  const segmenter = new TinySegmenter();

  const handleSubmit = () => {
    const authors = authorsString.split(",");
    onSubmit(new Book(title, isbn, authors, image));
    setTitle("");
    setIsbn("");
    setAuthors("");
    setImage("");
  };
  // useEffectでうまくやりたかったけど時間なかった
  const fetchBookInfo = () => {
    const baseUrl: string = 'https://api.openbd.jp/v1/get?isbn=';
    fetch(baseUrl + isbn)
      .then(response => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
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
            検索
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
            保存
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField
            onChange={(e) => setWakati(segmenter.segment(e.target.value).join(","))}
            label="わかち書きにする"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={10}>
        <p>{wakati}</p>
        </Grid>
      </Grid>
    </Container>
  );
};
