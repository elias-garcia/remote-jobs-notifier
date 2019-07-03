interface UrlEntity {
  url: string;
  display_url: string;
  expanded_url: string;
  indices: [number, number];
}

interface Entities {
  urls: UrlEntity[];
}

interface User {
  id: number;
  name: string;
  description: string;
  entities: Entities;
  url: string;
  verified: boolean;
}

interface Status {
  id: number;
  entities: Entities;
  text?: string;
  full_text?: string;
  truncated: boolean;
  user: User;
}

interface Metadata {
  max_id?: number;
  since_id?: number;
  refresh_url?: string;
  next_results?: string;
  count?: number;
  completed_in?: number;
  since_id_str?: string;
  query?: string;
  max_id_str?: string;
}

export interface SearchResponse {
  statuses: Status[];
  search_metadata: Metadata;
}
