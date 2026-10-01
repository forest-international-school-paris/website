import type { APIRoute } from 'astro';
import { openHouse, school, calendarStamp, calendarTitle, calendarDescription, visitUrl } from '../../lib/open-house';

const escape = (text: string) => text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
// RFC 5545 folding counts UTF-8 octets, not JavaScript characters.
const fold = (line: string) => {
  let result = '', bytes = 0;
  for (const char of line) {
    const length = new TextEncoder().encode(char).length;
    if (bytes + length > 75) { result += '\r\n '; bytes = 1; }
    result += char; bytes += length;
  }
  return result;
};
export const GET: APIRoute = () => {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Forest International School Paris//Open House//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${openHouse.id}@forest-international.com`, `DTSTAMP:${calendarStamp(new Date().toISOString())}`,
    `DTSTART:${calendarStamp(openHouse.start)}`, `DTEND:${calendarStamp(openHouse.end)}`,
    `SUMMARY:${escape(calendarTitle)}`, `LOCATION:${escape(school.address)}`,
    `DESCRIPTION:${escape(calendarDescription)}`, `URL:${visitUrl}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Open House tomorrow', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ];
  return new Response(lines.map(fold).join('\r\n') + '\r\n', { headers: {
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': `attachment; filename="${openHouse.id}.ics"`,
  }});
};
