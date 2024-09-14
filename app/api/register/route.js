import Login from "@/models/LoginModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { mongooseConnect } from "@/lib/mongoose";


const registerHandler = async (req) => {
    try {
        await mongooseConnect();
    }
    catch (error) {
        console.error("MongoConnection Failed: ", error);
    }

    if (req.method === "POST") {
        try {
            // console.log("Registering user.");
            
            const { name, email, password } = await req.json();

            const exists = await Login.findOne({ email });
            // console.log(exists);
            if (exists) {
                return NextResponse.json(
                    { message: "Email already exists. Please try again with different email." },
                    { status: 500 }
                );
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await Login.create({ name, email, password: hashedPassword });

            return NextResponse.json({ message: "Successfully Registered !" }, { status: 201 });
        } catch (error) {
            console.log("Error while registering user.", error);
            return NextResponse.json({ message: 'Error while registering user.' }, { status: 500 });
        }

    }

}

export { registerHandler as POST }