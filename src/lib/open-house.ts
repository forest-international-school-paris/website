import registry from '../../seo/_registry.json';
import { school } from './site';

export { school };
export const openHouse = registry.open_house;
const date = new Date(openHouse.start);
export const eventDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: openHouse.timeZone,
}).format(date);
export const eventDay = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long', timeZone: openHouse.timeZone,
}).format(date);
const time = (value: string) => new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: '2-digit', hour12: true, timeZone: openHouse.timeZone,
}).format(new Date(value));
export const eventTime = `${time(openHouse.start)} - ${time(openHouse.end)}`;
export const calendarStamp = (value: string) => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
export const visitUrl = `${registry.site}/open-house/thank-you/`;
export const calendarTitle = `${openHouse.title} — ${school.name}`;
export const directionsUrl = 'https://www.google.com/maps/dir/?' + new URLSearchParams({
  api: '1', destination: `${school.name}, ${school.address}`,
});
export const calendarDescription = [
  `${eventDay}, ${eventDate}`,
  `${eventTime} (Paris time)`,
  school.name,
  school.address,
  '',
  `Visit details: ${visitUrl}`,
  `Directions: ${directionsUrl}`,
  '',
  openHouse.parkingNote,
  `Nearby car park: ${openHouse.parkingUrl}`,
].join('\n');
export const googleCalendarUrl = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
  action: 'TEMPLATE', text: calendarTitle,
  dates: `${calendarStamp(openHouse.start)}/${calendarStamp(openHouse.end)}`,
  ctz: openHouse.timeZone, details: calendarDescription, location: school.address,
});
