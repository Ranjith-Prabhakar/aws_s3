const { S3Client, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
require("dotenv").config()

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

async function listObjects() {
  const command = new ListObjectsV2Command({
    Bucket: "bucket.privet",
    Key: `/`,
  })
  const result = await s3Client.send(command)
  console.log(result)
}

async function init() {
  await listObjects()
}

init() 