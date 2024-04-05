export interface INews {
  image: string;
  publishedDate: string;
  site: string;
  symbol: string;
  text: string;
  url: string;
  title: string;
}

export interface INewsAtom {
  [type: string]: INews[];
}