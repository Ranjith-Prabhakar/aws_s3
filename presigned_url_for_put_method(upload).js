const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
require("dotenv").config()

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

async function putObject(filename, conterntType) {
  const command = new PutObjectCommand({
    Bucket: "bucket.privet",
    Key: `uploads/user-uploads/${filename}`, // if there is no file it will create the file and uploads
    ContentType: conterntType
  })
  const url = await getSignedUrl(s3Client, command)
  return url
}

async function init() {
  console.log(await putObject(`video-${Date.now()}.jpeg`, "video/mp4"))

}

init() 