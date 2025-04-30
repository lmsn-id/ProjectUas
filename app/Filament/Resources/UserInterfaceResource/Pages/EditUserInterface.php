<?php

namespace App\Filament\Resources\UserInterfaceResource\Pages;

use App\Filament\Resources\UserInterfaceResource;
use App\Models\UserInterface;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditUserInterface extends EditRecord
{
    protected static string $resource = UserInterfaceResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($data['status']) {
            $exists = UserInterface::where('page', $data['page'])
                ->where('layout', $data['layout'])
                ->where('urutan', $data['urutan'])
                ->where('status', true)
                ->where('id', '!=', $this->record->id)
                ->exists();

            if ($exists) {
                Notification::make()
                    ->title("Data dengan urutan {$data['urutan']} untuk page \"{$data['page']}\" dan layout \"{$data['layout']}\" sudah aktif.")
                    ->danger()
                    ->send();

                $this->halt();
            }
        }

        return $data;
    }
}
