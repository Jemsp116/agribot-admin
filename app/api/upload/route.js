import { NextResponse } from 'next/server';
import { PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const uploadHandler = async (req) => {
  
  const links = [];
  const method = req.method;

  const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  if (method === 'POST') {
    const data = await req.formData();
    const files = data.get('file');

    if (!files) {
      return NextResponse.json({ message: "File Not Uploaded" });
    }

    const bytes = await files.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = files.name.split('.').pop();

    const newFilename = Date.now() + '.' + ext;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newFilename,
      Body: buffer,
      ContentType: files.type,
      ACL: 'public-read',
    };

    try{
      await client.send(new PutObjectCommand(params));
      const link = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${newFilename}`;
      links.push(link);
      return NextResponse.json({ message: "File Uploaded", links, link });
    }
    catch(err){
      console.log("error: ",err)
      return NextResponse.error(err)
    }
  }

  if (method === 'DELETE') {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    }

    try{
      await client.send(new DeleteObjectCommand(deleteParams));
      return NextResponse.json({message: 'File Deleted'})
    } catch(err){
      console.log("error: ",err)
    }
  }
}




// export const config = {
//   api: { bodyParser: false },
// }

export { uploadHandler as POST, uploadHandler as DELETE }