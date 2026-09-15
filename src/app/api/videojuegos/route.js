import { NextResponse } from "next/server";
import { VideojuegosService } from "@/app/service/videojuegos.services";

const service = new VideojuegosService()

export async function GET(request) {

    try{
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
    
        const videojuego = await service.obtenerPorId(id);
    
        return NextResponse.json(
            { success: true, data: videojuego },
            { status: 200 }
        );
    }catch(error){
        return NextResponse.json(
            { success: false, data: null, error: error.message },
            { status: 200 }
        );
    }
    
}

export async function POST(request){
    try {
        
        const body = await request.json()
        
        const result = await service.crear(body)
        return NextResponse.json(
            { success: true, data: result},
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message},
            { status: 200 }
        );
    }
}