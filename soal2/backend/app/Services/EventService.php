<?php
namespace App\Services;

use App\Models\Event;
use Carbon\Carbon;

class EventService
{
    public function create(array $data): Event
    {
        $event = Event::create($data);
        return $this->syncStatus($event);
    }

    public function syncStatus(Event $event): Event
    {
        $now = Carbon::now();
        $status = $now->lt($event->start_at) ? 'upcoming'
                 : ($now->between($event->start_at, $event->end_at) ? 'active' : 'ended');

        if ($event->status !== $status) {
            $event->status = $status;
            $event->save();
        }
        return $event;
    }

    public function syncAll(): void
    {
        Event::query()->chunkById(200, function ($chunk) {
            foreach ($chunk as $event) $this->syncStatus($event);
        });
    }
}
