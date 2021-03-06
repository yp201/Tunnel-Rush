// @flow

const loadImage = async (source: string): Promise<Image> => new Promise((resolve: *) => {
  const image = new Image(255, 0);
  image.src = source;
  image.onload = () => {
    resolve(image);
  };
});

export default loadImage;