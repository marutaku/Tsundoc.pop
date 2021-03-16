export interface BookImpl {
  isbn: string;
  title: string;
  author?: string[];
  image?: string;
  createdAt: Date;
  toString: () => string;
  // static parse: (jsonString: string) => BookImpl;
}
