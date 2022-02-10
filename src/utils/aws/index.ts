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
    console.log("error", error);
  }
};

// export const putObjectInBucket = () => {
//     const command = new PutObjectCommand();
// };

// Called when an identity provider has a token for a logged in user
export function userLoggedIn(providerName: string, token: string) {
  // creds.params.Logins = creds.params.Logins || {};
  // creds.params.Logins[providerName] = token;
  // Expire credentials to refresh them on the next request
  // creds.expired = true;
}
