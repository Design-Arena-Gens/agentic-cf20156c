"use client";
import { CalendarGrid } from '../../components/CalendarGrid';

export default function CalendarPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Content Calendar</h1>
      </div>
      <CalendarGrid />
    </div>
  );
}
