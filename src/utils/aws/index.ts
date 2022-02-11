import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import {
  S3,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { s3Client } from "../../context/auth";

// * Cognito Identity Pool configuration
export const credentials = fromCognitoIdentityPool({
  identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || "",
  clientConfig: { region: process.env.NEXT_PUBLIC_AWS_REGION },
});

// * S3 Instantiation
// export const s3Client = new S3({
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   credentials,
// });
// export const s3Client = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   credentials,
// });

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
