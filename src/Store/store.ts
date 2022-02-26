import { IPost } from "./../Models/Interfaces/IPostDialog";
import { createStore } from "redux";
import { IImageObject } from "../Models/Interfaces/IImageObject";
import { initalStates } from "../Models/Data/InitalStates";
import { v4 as uuidv4 } from "uuid";

function counterReducer(state = [] as IImageObject[], action: any) {
  switch (action.type) {
    case "Images/AddObject":
      //Check if Item is Duplicated
      // first condition is to check if there are no duplicate items in the data provided since i wanted to use as is
      // second condition is to check if the item no deplicate id after since i wanted to mutate the data provided to add uuid and timestamps
      const isDuplicated = state.some(
        (imageObject: IImageObject) =>
          (imageObject.img === action.payload.img &&
            imageObject.text === action.payload.text) ||
          imageObject.id === action.payload.id
      );
      if (isDuplicated) {
        return state;
      }
      return [...state, action.payload];
    case "Images/RemoveObject":
      return state.filter((item) => item.id !== action.payload);
    case "Images/UpdateObject":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    case "Images/rebase":
      return action.payload;
    default:
      return state;
  }
}

let store = createStore(counterReducer);

export const addImageObject = (imageObject: IImageObject) => {
  store.dispatch({ type: "Images/AddObject", payload: imageObject });
};
export const removeImageObject = (id: string) => {
  store.dispatch({ type: "Images/RemoveObject", payload: id });
};
export const InitImages = () => {
  initalStates.map((item) => {
    let obj: IImageObject = {
      text: item.text,
      img: item.img,
      id: uuidv4(),
      dateAdded: new Date(),
      lastUpdated: new Date(),
    };
    addImageObject(obj);
  });
};

export const reInitImages = (newItems: IImageObject[]) => {
  let reintializedList: IImageObject[] = [];
  newItems.forEach((item) => {
    let obj: IImageObject = {
      text: item.text,
      img: item.img,
      id: uuidv4(),
      dateAdded: new Date(),
      lastUpdated: new Date(),
    };
    reintializedList.push(obj);
  });

  store.dispatch({ type: "Images/rebase", payload: reintializedList });
};

export const updateImageObject = (imageObject: IPost) => {
  let object: IImageObject = {
    text: imageObject.text,
    img: imageObject.img,
    id: imageObject.id ? imageObject.id : uuidv4(),
    dateAdded: imageObject.dateAdded ? imageObject.dateAdded : new Date(),
    lastUpdated: new Date(),
  };
  store.dispatch({ type: "Images/UpdateObject", payload: object });
};

export const fetchImages = (
  skip: number = 0,
  take: number = 12,
  search: string = ""
) => {
  let images: IImageObject[] = [];
  if (search !== "") {
    images = store.getState().filter((item) => {
      return item.text.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    images = store.getState();
  }
  return images
    .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
    .slice(skip, skip + take);
};
export default store;
