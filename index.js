const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
require("dotenv").config()

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: "bucket.privet", // bucket name
    Key: key
  })

  const url = await getSignedUrl(s3Client, command)
  return url
}

async function init() {
  console.log( await getObjectUrl("Wildlife Windows 7 Sample Video.mp4"))

}

init() // the key we get here wont have any permission to use the resource since the user doesnt providede the access to s3 while 
// createing him so we have to permit him