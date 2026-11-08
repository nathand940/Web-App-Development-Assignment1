import { storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImageToFirebase(file) {
  const fileName = `placemarks/${Date.now()}-${file.originalname}`;
  const storageRef = ref(storage, fileName);

  const snapshot = await uploadBytes(storageRef, file.buffer);
  const url = await getDownloadURL(snapshot.ref);

  return url;
}
