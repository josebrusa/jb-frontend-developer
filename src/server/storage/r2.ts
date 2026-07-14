import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucket = process.env.CLOUDFLARE_R2_BUCKET;
const publicAssetsUrl = process.env.CLOUDFLARE_PUBLIC_ASSETS_URL;

export function getPublicAssetUrl(key: string): string | null {
  if (!publicAssetsUrl) {
    return null;
  }

  return `${publicAssetsUrl.replace(/\/$/, "")}/${encodeURI(key.replace(/^\//, ""))}`;
}

export function hasR2Config(): boolean {
  return Boolean(endpoint && accessKeyId && secretAccessKey && bucket && publicAssetsUrl);
}

export function getR2Bucket(): string {
  if (!bucket) {
    throw new Error("CLOUDFLARE_R2_BUCKET is required");
  }

  return bucket;
}

export function getR2Client(): S3Client {
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_ACCESS_KEY_ID, and CLOUDFLARE_R2_SECRET_ACCESS_KEY are required",
    );
  }

  if (accessKeyId.length !== 32) {
    throw new Error(
      "CLOUDFLARE_R2_ACCESS_KEY_ID must be the 32-character R2 S3 access key, not a Cloudflare API token",
    );
  }

  const endpointUrl = new URL(endpoint);

  if (endpointUrl.pathname !== "/") {
    throw new Error(
      "CLOUDFLARE_R2_ENDPOINT must not include the bucket name. Use https://<account-id>.r2.cloudflarestorage.com and set CLOUDFLARE_R2_BUCKET separately.",
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: endpointUrl.origin,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function uploadToR2(input: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<string> {
  const client = getR2Client();

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: getR2Bucket(),
        Key: input.key,
        Body: input.body,
        ContentType: input.contentType,
      }),
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AccessDenied") {
      throw new Error(
        `Cloudflare R2 denied write access to ${bucket}/${input.key}. Check that CLOUDFLARE_R2_BUCKET matches the bucket for this token, CLOUDFLARE_R2_ENDPOINT uses the same account, and the R2 API token has Object Read & Write permissions.`,
      );
    }

    throw error;
  }

  const publicUrl = getPublicAssetUrl(input.key);

  if (!publicUrl) {
    throw new Error("CLOUDFLARE_PUBLIC_ASSETS_URL is required to build the public asset URL");
  }

  return publicUrl;
}
