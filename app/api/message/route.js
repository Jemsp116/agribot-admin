import { mongooseConnect } from "@/lib/mongoose";
import Message from "@/models/MessageModel";
import { NextResponse } from "next/server";

const getMessages = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const robot = await Message.findOne({ _id: id });
            if (!robot) {
                return NextResponse.json({ message: "Message not found" }, { status: 404 });
            }
            return NextResponse.json(robot);
        }
        const robots = await Message.find();
        return NextResponse.json(robots);
    } catch (error) {
        console.error("Error fetching robots:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};


const deleteMessage = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "Message ID is required" }, { status: 400 });
    }

    try {
        await Message.deleteOne({ _id: id });
        return NextResponse.json({ message: "Message successfully deleted" });
    } catch (error) {
        console.error("Error deleting robot:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};

// Main handler function
const robotHandler = async (req) => {
    await mongooseConnect();

    const method = req.method;

    switch (method) {
        case "GET":
            return getMessages(req);
        case "DELETE":
            return deleteMessage(req);
        default:
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
    }
};

// Export the handler for all HTTP methods
export { robotHandler as GET, robotHandler as DELETE };
