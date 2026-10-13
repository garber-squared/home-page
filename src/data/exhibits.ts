// Client proof shown under "Exhibits" on the home page.
// Both lists are empty until real, publishable material is supplied. Do not add sample entries.

export interface CaseStudy {
  client: string;
  summary: string;
  href?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const caseStudies: CaseStudy[] = [];

export const testimonials: Testimonial[] = [];
