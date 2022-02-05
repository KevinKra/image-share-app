import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// * Cognito Identity Pool configuration
export const credentials = fromCognitoIdentityPool({
  identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || "",
  clientConfig: { region: process.env.NEXT_PUBLIC_AWS_REGION },
});

// * S3 Instantiation
export const s3Client = new S3({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials,
});

export const albumBucket = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME;

export const getBucketObjects = async () => {
  const command = new ListObjectsCommand({
    Bucket: albumBucket,
  });

  try {
    const response = await s3Client.send(command);
    console.log("res", response);
  } catch (error) {
    console.log("error", error);
  }
};

// export const putObjectInBucket = () => {
//     const command = new PutObjectCommand();
// };
