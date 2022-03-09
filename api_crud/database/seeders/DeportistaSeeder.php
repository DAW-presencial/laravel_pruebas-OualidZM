<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeportistaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = 
        [
            [
                "name" => "Miquel",
                "surname" => "Ferrer",
                "phone" => "643678291",
                "age" => "34"
            ],
            [
                "name" => "Pablo",
                "surname" => "Escobar",
                "phone" => "643678291",
                "age" => "34"
            ],
            [
                "name" => "Toni",
                "surname" => "Martinez",
                "phone" => "643678291",
                "age" => "34"
            ],
        ];

        DB::table('deportistas')->insert($data);
    }
}
