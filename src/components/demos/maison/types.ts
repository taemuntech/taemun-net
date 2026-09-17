export interface Product {
  id: string;
  name: string;
  enName: string;
  period: string;
  periodSubtitle?: string;
  category: 'french' | 'british' | 'lighting' | 'mirrors' | 'objects' | 'furniture';
  originEra: string;
  materials: string;
  dimensions: string;
  price: number;
  formattedPrice: string;
  image: string;
  imageAlt: string;
  tag1: string; // e.g. "France, 1870s"
  tag2?: string; // e.g. "Only 1 Available" or "Certified Origin"
  marble?: string;
  restorationStatus?: string;
  refCode: string;
  provenanceDeed: string;
  description: string;
  featured?: boolean;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  filterKey: string;
}

export interface ResidenceStory {
  id: string;
  image: string;
  imageAlt: string;
  quote: string;
  clientName: string;
  clientRole: string;
  projectLocation: string;
}
