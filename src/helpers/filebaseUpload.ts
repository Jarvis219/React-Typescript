/* eslint-disable @typescript-eslint/no-unused-expressions */
import firebase from "firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";
export const FirebaseUploadMultiplePhoto = (image: File): Promise<string> => {
  const [photo, setPhoto] = useState<any>(image);
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(`images/${photo.name}`);
    const task = storageRef.put(photo);
    task.on(
      "state_changed",
      (snapshot) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      async function complete() {
        const imageURL = await task.snapshot.ref.getDownloadURL();
        setPhoto(imageURL);
        resolve(imageURL);
      }
    );
  });
};

export const FirebaseUploadPhoto = (image: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image).then(() => {
      getDownloadURL(ref(storage, `images/${image.name}`)).then((url) => {
        resolve(url);
      });
    });
  });
};

export const DeletePhotoUpload = (url: string) => {
  const storage = getStorage();
  const photoURL = url.split("%")[1].split("2F")[1].split("?")[0].toLowerCase();
  // Create a reference to the file to delete
  const desertRef = ref(storage, `images/${photoURL}`);
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
