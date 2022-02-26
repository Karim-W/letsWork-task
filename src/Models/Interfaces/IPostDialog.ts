export interface IPostDialog {
  Post?: IPost;
}
export interface IPost {
  text: string;
  img: string;
  id?: string;
  dateAdded?: Date;
}
