export interface ProjectItem {
  _id: number;
  cover_image: string;
  title: string;
  description: string;
  project_url: string;
  github_url: string;
  tag: string;
  tools: string[];
}

export interface TestimonialItem {
  _id: number;
  full_name: string;
  email: string;
  comment: string;
  rating: number;
}
