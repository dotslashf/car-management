import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const data = await req.json()
    await prisma.car.create({
        data
    })
    return Response.json({ success: true })
}

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search') ?? '';
    if (search) {
        const cars = await prisma.car.findMany({
            where: {
                brand: {
                    equals: `%${search}%`,
                    mode: 'insensitive'
                }
            }
        });
        return Response.json({
            success: true,
            data: cars
        })
    }
    const cars = await prisma.car.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return Response.json({
        success: true,
        data: cars
    })
}