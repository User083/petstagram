import { Image, ImageCrop, Reference } from "sanity";

export interface ImagePost {
  caption: string;
  image: { asset: { url: string }; hotspot: { height: number; width: number } };
  userId: string;
  postedBy: {
    _id: string;
    userName: string;
    profilePicture: string;
  };
  likes: Array;
  comments: [postedBy: Reference, comment: string];
  _id: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  profilePicture: string;
  email: string;
}
