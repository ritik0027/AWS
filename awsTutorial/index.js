require("dotenv").config();

const {S3Client,GetObjectCommand, PutObjectCommand, ListObjectsV2Command , DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const S3Client1=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
    }
});

async function getObjectURL(key) {
    const command=new GetObjectCommand({
        Bucket:"mybucket.dev.demo",
        Key:key
    })
    const url=getSignedUrl(S3Client1,command);
    return url;
}

async function putObjectURL(fileName) {
    const command=new PutObjectCommand({
        Bucket:"mybucket.dev.demo",
        Key:`uploads/user-uploads/${fileName}`,
    })
    const url=getSignedUrl(S3Client1,command);
    return url;
}

async function listObjects() {
    const command=new ListObjectsV2Command({
        Bucket:"mybucket.dev.demo",
        Key:"/",
    })
    const result=await S3Client1.send(command);
    console.log(result)
}

async function deleteFile(fileName) {
    const command=new DeleteObjectCommand({
        Bucket:"mybucket.dev.demo",
        Key:"Screenshot 2025-01-07 005444.png",
    })
    const result=await S3Client1.send(command);
    console.log(result)
    
}


async function init(){
   //console.log("URL for the file", await getObjectURL("uploads/user-uploads/video-1739275332122.mp4"));
    //console.log("URL for Uploading", await putObjectURL(`video-${Date.now()}.mp4`),"video/mp4");
   // await listObjects()
   await deleteFile()

}

init()