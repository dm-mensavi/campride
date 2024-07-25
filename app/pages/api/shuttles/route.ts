import { initMongoose } from "@/app/lib/mongodb";
import Shuttle from "@/app/models/buses";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Shuttle as ShuttleType } from "../../../types";
import mongoose from 'mongoose';

// Function to validate the request body
const isValidShuttle = (body: any): body is ShuttleType => {
  return (
    typeof body.shuttle_number === "string" &&
    typeof body.shuttle_type === "string" &&
    typeof body.shuttle_image_url === "string" &&
    typeof body.shuttle_icon === "string"
  );
};

// POST Request Handler
export async function POST(req: NextRequest) {
  try {
    await initMongoose();
    const body: ShuttleType = await req.json();

    // Validate the request body
    if (!isValidShuttle(body)) {
      return NextResponse.json({ error: 'Invalid shuttle data' }, { status: 400 });
    }

    const shuttle = new Shuttle(body);
    await shuttle.save();
    return NextResponse.json(shuttle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET Request Handler
export async function GET(req: NextRequest) {
  try {
    await initMongoose();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const shuttleNumber = searchParams.get('shuttle_number');

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
      }
      const shuttle = await Shuttle.findById(id);
      if (!shuttle) {
        return NextResponse.json({ error: 'Shuttle not found' }, { status: 404 });
      }
      return NextResponse.json(shuttle);
    } else if (shuttleNumber) {
      const shuttle = await Shuttle.findOne({ shuttle_number: shuttleNumber });
      if (!shuttle) {
        return NextResponse.json({ error: 'Shuttle not found' }, { status: 404 });
      }
      return NextResponse.json(shuttle);
    } else {
      const shuttles = await Shuttle.find();
      return NextResponse.json(shuttles);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT Request Handler
export async function PUT(req: NextRequest) {
  try {
    await initMongoose();
    const body: Partial<ShuttleType> & { _id: string } = await req.json();

    if (!body._id || !mongoose.Types.ObjectId.isValid(body._id)) {
      return NextResponse.json({ error: 'Invalid or missing shuttle ID' }, { status: 400 });
    }

    const updateData = body as Partial<ShuttleType>;
    if (
      (updateData.shuttle_number && typeof updateData.shuttle_number !== 'string') ||
      (updateData.shuttle_type && typeof updateData.shuttle_type !== 'string') ||
      (updateData.shuttle_image_url && typeof updateData.shuttle_image_url !== 'string') ||
      (updateData.shuttle_icon && typeof updateData.shuttle_icon !== 'string')
    ) {
      return NextResponse.json({ error: 'Invalid shuttle data' }, { status: 400 });
    }

    const shuttle = await Shuttle.findByIdAndUpdate(body._id, updateData, { new: true });
    if (!shuttle) {
      return NextResponse.json({ error: 'Shuttle not found' }, { status: 404 });
    }

    return NextResponse.json(shuttle);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE Request Handler
export async function DELETE(req: NextRequest) {
  try {
    await initMongoose();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid or missing shuttle ID' }, { status: 400 });
    }

    const shuttle = await Shuttle.findByIdAndDelete(id);
    if (!shuttle) {
      return NextResponse.json({ error: 'Shuttle not found' }, { status: 404 });
    }

    return NextResponse.json({ id: shuttle.id, message: 'Shuttle deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
