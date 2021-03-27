import moment from "moment";

export interface BookImpl {
  isbn: string;
  title: string;
  author?: string[];
  image?: string;
  nouns?: string;
  createdAt: Date;
  toString: () => string;
  // static parse: (jsonString: string) => BookImpl;
}

export class Book implements BookImpl {
  constructor(
    public title: string,
    public isbn: string,
    public authors: string[] = [],
    public image?: string,
    public nouns?: string,
    public createdAt: Date = new Date()
  ) {}
  public toString(): string {
    return JSON.stringify({
      title: this.title,
      isbn: this.isbn,
      authors: this.authors,
      image: this.image,
      nouns: this.nouns,
      createdAt: moment(this.createdAt).toISOString(),
    });
  }
  static parse(jsonString: string): Book {
    const data = JSON.parse(jsonString);
    return new Book(
      data.title,
      data.isbn,
      data.authors,
      data.image,
      data.nouns,
      moment(data.createdAt).toDate()
    );
  }
}

export interface SuggestBook extends Book {
  commonNounSet?: Set<string>;
  similarity?: Number
}

