// Local app types that mirror the Prisma schema.
// Keep description nullable (string | null) to match Prisma's optional field behavior.
export interface MenuItem {
    id: number;
    name: string;
    price: number;
    mainCategory?: MainCategory;
    category?: string;
    shortDescription?: string;
    description?: string;
    restaurantId: number;
    ingredients?: Ingredient[];
    drinkCategories?: Category[];
    mainIngredients?: MenuItemMainIngredient[];
}

export interface MainIngredientJoin {
    id: number;
    menuItemId: number;
    ingredientId: number;
    position: number;
    ingredient?: Ingredient;
}

export interface MenuItemFull extends MenuItem {
    categories?: Category[];
    drinkCategories?: Category[];
    allergens?: Allergen[];
    additives?: Additive[];
    images?: Image[];
    mainIngredients?: MainIngredientJoin[];
    mainImage?: Image | null;
}

export interface Restaurant {
    id: number;
    code: string;
    name: string;
    description?: string;
    MenuItem?: MenuItem[];
    menu?: MenuItem[];

}
export interface MainCategory {
    id: number;
    name: string;
    description?: string;
    displayName?: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    displayName?: string;
    sequence?: number;
}

export interface Allergen {
    id: number;
    code: string;
    name: string;
    description?: string;
    iconName?: string;
}

export interface Additive {
    id: number;
    code: string;
    name: string;
    description?: string;
    iconName?: string;
}

export interface Ingredient {
    id: number;
    name: string;
    description?: string;
    iconName?: string;
    displayName?: string;
}

export interface Image {
    id: number;
    url: string;
    menuItemId: number;
    sequence?: number;
}

export interface MenuItemMainIngredient {
  id: number;
  menuItemId: number;
  ingredientId: number;
  position: number;       // DB enforces 1..3
  ingredient?: Ingredient; // optional nested payload (use Ingredient here)
}

export type MenuItemMainIngredientWithIngredient = MenuItemMainIngredient & { ingredient: Ingredient };
export type MenuItemWithMainIngredients = MenuItem & { mainIngredients: MenuItemMainIngredientWithIngredient[] };