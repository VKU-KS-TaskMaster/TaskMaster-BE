import {ref, getStorage, getDownloadURL} from 'firebase/storage';

export const getImage = async path => {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  await getDownloadURL(imageRef).then(x => {
    return x;
  });
};

export const getMutipleImages = async (arrImages, callback) => {
  const storage = getStorage();

  for (const imagePath of arrImages) {
    const imageRef = ref(storage, 'comic_images/' + imagePath);

    await getDownloadURL(imageRef).then(x => {
      callback(prev => [...prev, x]);
    });
  }
};
