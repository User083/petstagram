import { DatetimeDefinition, Image, ImageCrop, Reference } from "sanity";

export interface ImagePost {
  caption: string;
  _createdAt: string;
  image: { asset: { url: string }; hotspot: { height: number; width: number } };
  userId: string;
  postedBy: {
    _id: string;
    userName: string;
    profilePicture: string;
  };
  likes: Array;
  comments: Array;
  _id: string;
  topic: string;
  uploaded: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  profilePicture: string;
  email: string;
}
