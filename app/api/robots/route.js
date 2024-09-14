import { mongooseConnect } from "@/lib/mongoose";
import Robot from "@/models/RobotModel";
import { NextResponse } from "next/server";

const getRobots = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const robot = await Robot.findOne({ _id: id });
            if (!robot) {
                return NextResponse.json({ message: "Robot not found" }, { status: 404 });
            }
            return NextResponse.json(robot);
        }
        const robots = await Robot.find();
        return NextResponse.json(robots);
    } catch (error) {
        console.error("Error fetching robots:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};




const deleteRobot = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "Robot ID is required" }, { status: 400 });
    }

    try {
        await Robot.deleteOne({ _id: id });
        return NextResponse.json({ message: "Robot successfully deleted" });
    } catch (error) {
        console.error("Error deleting robot:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};

const createRobot = async (req) => {
    const body = await req.json();

    if (!body.name || !body.price) {
        return NextResponse.json({ message: "Title and price are required" }, { status: 400 });
    }

    try {
        const robotDoc = await Robot.create({
            name: body.name,
            description: body.description,
            price: body.price,
            images: body.images,
            features: body.features,
            type: body.type,
        });
        return NextResponse.json(robotDoc, { status: 201 });
    } catch (error) {
        console.error("Error creating robot:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};

const updateRobot = async (req) => {
    const body = await req.json();

    if (!body._id || !body.name || !body.price) {
        return NextResponse.json({ message: "ID, title, and price are required" }, { status: 400 });
    }

    try {
        const updatedRobot = await Robot.updateOne(
            { _id: body._id },
            {
                name: body.name,
                description: body.description,
                price: body.price,
                images: body.images,
                features: body.features,
                type: body.type,
            }
        );

        if (updatedRobot.matchedCount === 0) {
            return NextResponse.json({ message: "Robot not found" }, { status: 404 });
        }

        return NextResponse.json(updatedRobot);
    } catch (error) {
        console.error("Error updating robot:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};

// Main handler function
const robotHandler = async (req) => {
    // Run the CORS middleware
    await runMiddleware(req, res, cors);
    await mongooseConnect();

    const method = req.method;

    switch (method) {
        case "GET":
            return getRobots(req);
        case "POST":
            return createRobot(req);
        case "PUT":
            return updateRobot(req);
        case "DELETE":
            return deleteRobot(req);
        default:
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
    }
};

// Export the handler for all HTTP methods
export { robotHandler as GET, robotHandler as POST, robotHandler as PUT, robotHandler as DELETE };
