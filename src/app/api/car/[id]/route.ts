import client from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const car = await client.car.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    return Response.json({ success: true, data: car })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json()
    await client.car.update({
        where: {
            id: parseInt(params.id)
        },
        data
    })
    return Response.json({ success: true })
}