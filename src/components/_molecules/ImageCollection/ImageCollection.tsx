import React, { useState } from "react";
import Image from "next/image";
import { albumBucket, getAlbumObjects } from "../../../utils/aws";

const ImageCollection = () => {
  const [images, setImages] = useState<any>([]);

  const onClick = async () => {
    const response = await getAlbumObjects();
    setImages(response);
  };

  return (
    <div>
      <button onClick={onClick}>view album</button>
      {images &&
        images.length > 0 &&
        images.map((image: any) => (
          <Image
            key={image.Key}
            alt={image.Key}
            src={`https://kkrato-image-share.s3.us-east-2.amazonaws.com/${image.Key}`}
            height={500}
            width={500}
          />
        ))}
    </div>
  );
};

export default ImageCollection;
