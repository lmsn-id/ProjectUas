<?php

namespace App\Filament\Resources\UserInterfaceResource\Pages;

use App\Filament\Resources\UserInterfaceResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserInterfaces extends ListRecords
{
    protected static string $resource = UserInterfaceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
