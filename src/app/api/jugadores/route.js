import { NextResponse } from "next/server"
import { JugadoresServices } from "@/app/service/jugadores.services"

const service = new JugadoresServices()

export async function GET(request){
    try{

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const jugador = await service.obtenerPorId(id);

        return NextResponse.json(
            { success: true, data: jugador },
            { status: 200 }
        );
    }catch(error){
        return NextResponse.json(
            { success: false, data: null, error: error.message },
            { status: 200 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json()

        const result = await service.crear(body)
        return NextResponse.json(
            { success: true, data: result},
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null, error: error.message },
            { status: 200 }
        );
    }
}