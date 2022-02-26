<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeportistaResource;
use App\Models\Deportista;
use Illuminate\Http\Request;

class DeportistasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deportistas = Deportista::all();
        return response()->json([new DeportistaResource($deportistas)]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $deportistas = Deportista::create([
            "name" => $request->name,
            "surname" => $request->surname,
            "phone" => $request->phone,
            "age" => $request->age,
        ]);
        return response()->json(new DeportistaResource($deportistas),"Depostista Created");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $deportista = Deportista::find($id);
        return response()->json(new DeportistaResource($deportista));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $deportista = Deportista::find($id);
        $deportista->name = $request->name;
        $deportista->surname = $request->surname;
        $deportista->phone = $request->phone;
        $deportista->age = $request->age;
        $deportista->update();
        return response()->json(new  DeportistaResource($deportista),"Deportista Updated");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
