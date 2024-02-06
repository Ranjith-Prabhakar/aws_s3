
//same code in the index


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

  const url = await getSignedUrl(s3Client, command, { expiresIn: 20 }) // expires in 20 second but this is optional 
  return url
}

async function init() {
  console.log(await getObjectUrl("uploads/user-uploads/video-1707209432311.jpeg"))

}

init() // the key we get here wont have any permission to use the resource since the user doesnt providede the access to s3 while 
// createing him so we have to permit him