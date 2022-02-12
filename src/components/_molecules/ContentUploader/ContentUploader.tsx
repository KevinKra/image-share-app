import { useState } from "react";
import Image from "next/image";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { albumBucket } from "../../../utils/aws";
import { s3Client, useAuth } from "../../../context/auth";

function ContentUploader() {
  const [file, setFile] = useState<any>("");
  const { currentUser } = useAuth();

  const selectFile = async (e: any) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const params = { Bucket: albumBucket, Key: file.name, Body: file };
    const command = new PutObjectCommand(params);
    try {
      console.log({ s3Client });
      const response = await s3Client.send(command);
      console.log("upload success", response);
    } catch (error) {
      console.log("upload error", error);
    }
  };

  return (
    <div id="upload-box">
      <input type="file" onChange={selectFile} />
      <button onClick={uploadFile}>Upload File</button>
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      {file && <ImageThumb image={file} />}
    </div>
  );
}

interface IImageThumbnail {
  image: File;
}

const ImageThumb = ({ image }: IImageThumbnail) => {
  console.log(image);
  return (
    <Image
      src={URL.createObjectURL(image)}
      alt={image.name}
      height={500}
      width={500}
    />
  );
};

export default ContentUploader;
