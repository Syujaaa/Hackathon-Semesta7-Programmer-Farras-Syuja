<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\EventService;

class SyncEventStatus extends Command
{
    protected $signature = 'events:sync-status';
    protected $description = 'Sinkronkan status event (upcoming/active/ended) berdasarkan waktu';

    public function handle(EventService $service): int
    {
        $service->syncAll();
        $this->info('Event status synced.');
        return self::SUCCESS;
    }
}
