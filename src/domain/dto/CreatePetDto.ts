export interface CreatePetDto {
  name: string;
  species_type: string;
  description?: string;
  scientific_name?: string;
  habitat?: string;
  rarity?: string;
  is_mexican_native?: boolean;
  unlock_requirements?: any;
  evolution_chain?: any;
  base_stats?: any;
  avatar_url?: string;
  model_3d_url?: string;
  quiz_points_cost?: number;
  base_price?: number;
  icon_url?: string;
  evolution_stages?: number;
  environmental_preference?: string;
  available_in_store?: boolean;
}
