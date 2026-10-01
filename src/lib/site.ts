import registry from '../../seo/_registry.json';

export interface SiteLink {
  href: string;
  label: string;
  detail?: string;
}

export const school = registry.nap;
export const legalEntity = registry.legal_entity;
const phoneDigits = school.phone.replace(/\D/g, '');
export const phoneE164 = `+${phoneDigits}`;
export const telHref = `tel:${phoneE164}`;
export const mailHref = `mailto:${school.email}`;
export const whatsappHref = `https://wa.me/${phoneDigits}`;
export const mapsUrl = 'https://maps.app.goo.gl/ehdBdRjg7isVTQDX7';
export const instagramUrl = 'https://www.instagram.com/the_forestinternational_school/';

export const schoolHours = [
  { label: 'Office', value: '7:30 AM – 7:30 PM' },
  { label: 'School day', value: '8:45 AM – 3:45 PM' },
  { label: 'After-school Club', value: 'until 5:00 PM' },
  { label: 'Late Pick-up', value: 'until 6:00 PM' },
];

export const schoolLinks: SiteLink[] = [
  { href: '/about/', label: 'About the school' },
  { href: '/team/', label: 'Our team' },
];
export const programmeLinks: SiteLink[] = [
  { href: '/early-years/', label: 'Early Years', detail: 'Ages 2–5' },
  { href: '/primary/', label: 'Primary', detail: 'Ages 6–11' },
  { href: '/middle-school/', label: 'Middle School', detail: 'Ages 11–15' },
];
export const mainLinks: SiteLink[] = [
  { href: '/holiday-camps/', label: 'Holidays & Wednesdays' },
  { href: '/admissions/', label: 'Admissions' },
  { href: '/tuition/', label: 'Tuition' },
  { href: '/news/', label: 'News' },
];
export const frenchLinks: SiteLink[] = [
  { href: '/fr/admissions/', label: 'Admissions' },
  { href: '/fr/stages-vacances/', label: 'Stages de vacances' },
];
