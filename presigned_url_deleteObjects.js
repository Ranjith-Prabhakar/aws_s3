const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3")
require("dotenv").config()

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

async function deleteObjects() {
  const command = new DeleteObjectCommand({
    Bucket: "bucket.privet",
    Key: "/uploads/user-uploads/image-1707208243712.jpeg"
  })
  await s3Client.send(command)

}

async function init() {
  await deleteObjects()
}

init() 