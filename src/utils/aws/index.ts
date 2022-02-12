import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import {
  S3,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { s3Client } from "../../context/auth";

// * S3 guest instantiation

export const albumBucket = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME;

export const getAlbumObjects = async () => {
  const command = new ListObjectsCommand({
    // Prefix: "album1/",
    Bucket: albumBucket,
  });

  try {
    const response = await s3Client.send(command);
    console.log("res", response);

    return response.Contents;
  } catch (error) {
    console.log("getAlbumObjects Error", error);
  }
};
