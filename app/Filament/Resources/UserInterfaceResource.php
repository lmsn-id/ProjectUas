<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserInterfaceResource\Pages;
use App\Filament\Resources\UserInterfaceResource\RelationManagers;
use App\Models\UserInterface;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserInterfaceResource extends Resource
{
    protected static ?string $model = UserInterface::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $modelLabel = 'User Interface';

    protected static ?string $navigationLabel = 'User Interface';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->label('Judul'),

                Forms\Components\Textarea::make('text')
                    ->maxLength(65535)
                    ->columnSpanFull()
                    ->label('Teks Utama'),

                Forms\Components\Textarea::make('description')
                    ->maxLength(65535)
                    ->columnSpanFull()
                    ->label('Deskripsi (Gunakan baris baru untuk list)'),

                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->directory('user-interface')
                    ->preserveFilenames(false)
                    ->imageEditor()
                    ->deleteUploadedFileUsing(function ($file) {
                        Storage::disk('public')->delete($file);
                    })
                    ->moveFiles()
                    ->downloadable()
                    ->openable()
                    ->label('Gambar')
                    ->disk('public')
                    ->visibility('public'),

                Forms\Components\Select::make('page')
                    ->required()
                    ->options([
                        'All' => 'All',
                        'Home' => 'Home',
                    ])
                    ->label('Halaman'),

                Forms\Components\Select::make('layout')
                    ->required()
                    ->options([
                        'Navbar' => 'Navbar',
                        'Dashboard' => 'Dashboard',
                        'Layanan' => 'Layanan',
                    ])
                    ->label('Layout'),

                Forms\Components\Select::make('position')
                    ->options([
                        'left' => 'Kiri',
                        'right' => 'Kanan',
                        'top' => 'Atas',
                        'bottom' => 'Bawah',
                    ])
                    ->label('Posisi'),

                Forms\Components\TextInput::make('urutan')
                    ->required()
                    ->numeric()
                    ->default(1)
                    ->label('Urutan Tampil'),

                Forms\Components\Toggle::make('status')
                    ->required()
                    ->label('Aktif'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->label('Judul'),
                Tables\Columns\TextColumn::make('page')
                    ->searchable()
                    ->label('Halaman'),
                Tables\Columns\TextColumn::make('layout')
                    ->searchable()
                    ->label('Layout'),
                Tables\Columns\ImageColumn::make('image')
                    ->label('Gambar')
                    ->disk('public')
                    ->url(fn($record) => $record->image ? asset('storage/' . $record->image) : null),
                Tables\Columns\TextColumn::make('urutan')
                    ->numeric()
                    ->sortable()
                    ->label('Urutan'),
                Tables\Columns\IconColumn::make('status')
                    ->boolean()
                    ->label('Status'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('page')
                    ->options([
                        'home' => 'Home',
                        'about' => 'About',
                    ])
                    ->label('Filter Berdasarkan Halaman'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->before(function ($record) {
                        if ($record->image) {
                            Storage::disk('public')->delete($record->image);
                        }
                    })
                    ->requiresConfirmation(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->before(function ($records) {
                            $records->each(function ($record) {
                                if ($record->image) {
                                    Storage::disk('public')->delete($record->image);
                                }
                            });
                        }),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUserInterfaces::route('/'),
            'create' => Pages\CreateUserInterface::route('/create'),
            'edit' => Pages\EditUserInterface::route('/{record}/edit')
        ];
    }
}