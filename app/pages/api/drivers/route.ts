import { NextRequest, NextResponse } from 'next/server';
import { initMongoose } from '@/app/lib/mongodb';
import DriverModel from "@/app/models/drivers";
import { Driver as DriverType } from '@/app/types';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    await initMongoose();
    const body: DriverType = await req.json();

    // Validate required fields
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing name' }, { status: 400 });
    }
    if (!body.route || typeof body.route !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing route' }, { status: 400 });
    }
    if (!body.shuttle_number || typeof body.shuttle_number !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing shuttle_number' }, { status: 400 });
    }

    const driver = new DriverModel(body);
    await driver.save();
    return NextResponse.json(driver);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await initMongoose();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const route = searchParams.get('route');
    
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
      }
      const driver = await DriverModel.findById(id);
      if (!driver) {
        return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
      }
      return NextResponse.json(driver);
    } else if (route) {
      const drivers = await DriverModel.find({ route });
      return NextResponse.json(drivers);
    } else {
      const drivers = await DriverModel.find();
      return NextResponse.json(drivers);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await initMongoose();
    const body: Partial<DriverType> & { id: string } = await req.json();
    const { id, ...updateData } = body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid or missing driver ID' }, { status: 400 });
    }

    if (updateData.name && typeof updateData.name !== 'string') {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (updateData.route && typeof updateData.route !== 'string') {
      return NextResponse.json({ error: 'Invalid route' }, { status: 400 });
    }
    if (updateData.shuttle_number && typeof updateData.shuttle_number !== 'string') {
      return NextResponse.json({ error: 'Invalid shuttle_number' }, { status: 400 });
    }

    const driver = await DriverModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!driver) {
      return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
    }

    return NextResponse.json(driver);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await initMongoose();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid or missing driver ID' }, { status: 400 });
    }

    const deletedDriver = await DriverModel.findByIdAndDelete(id);

    if (!deletedDriver) {
      return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
    }

    return NextResponse.json({ id: deletedDriver.id, message: 'Driver deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
