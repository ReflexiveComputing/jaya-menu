export interface Category {
  id: string;
  name: string;
  display_name: string;
  description: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


export type MenuCategory = {
  name: string;
  filename: string;
  count: number;
}