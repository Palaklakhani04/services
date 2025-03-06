import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import AddServices from "../model/Addservice";
import fs from "fs";
import path from "path";


export async function POST(req) {
    try {
        await dbConnect();
        const formData = await req.formData();// Read request body
       
        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");
        const file = formData.get("myfile"); // File upload

        if (!file) {
            return NextResponse.json({ message: "File is required" }, { status: 400 });
        }

        // Read file as Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload path (inside public/uploads)
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

         // Generate unique filename with timestamp
        //  const ext = path.extname(file.name);
        //  const baseName = path.basename(file.name, ext);
        //  const newFileName = `${baseName}-${Date.now()}${ext}`;
         
         // Define file path
        //  const filePath = path.join(uploadDir, newFileName);


        // Rename the file with timestamp
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`; // Example: 1709678901234-image.jpg
        const filePath = path.join(uploadDir, filename);

        console.log("File Path to be stored:", `/uploads/${filename}`);

        // Save file to the uploads directory
        fs.writeFileSync(path.join(uploadDir, filename), buffer);

        // Save the file
        fs.writeFileSync(filePath, buffer);

        const existingService = await AddServices.findOne({ title ,filePath: `/uploads/${filename}` });


        if (!existingService) {

            const newService = new AddServices({
                title,
                description,
                price,
                filePath: `/uploads/${filename}`, // ✅ Ensure this is saved
            });

            console.log("Data to be stored in MongoDB:", newService);
            await newService.save();
            
            return NextResponse.json(
                { message: 'Add Service successfully' },
                { status: 200 }
            );
        }
        else {
            return NextResponse.json(
                { message: 'service already exists' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}