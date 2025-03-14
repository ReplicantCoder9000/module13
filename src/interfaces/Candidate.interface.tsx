export interface Candidate {
  id: number;
  login: string; // username
  name: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
}
