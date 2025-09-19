
import { Header } from "@/components/ui/header";
import { FoodCardSlider } from "@/components/ui/food-card/food-card-slider";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { fetchMenuCategoriesFromApi, fetchMenuCategoryItemsFromApi } from "@/lib/server/menu-fetch-api";
import { Category } from "@/types/category";


export const revalidate = 600;

export async function generateStaticParams() {
  const categories = await fetchMenuCategoriesFromApi();
  return categories.map((c: Category) => ({ MenuCategory: c }));
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

export default async function MenuCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const items = await fetchMenuCategoryItemsFromApi(resolvedParams.category);
  const t = await getTranslations('Menu');
  //categories need to be stored in a state
  const categories = await fetchMenuCategoriesFromApi();
  // Find the category object by filename
  const categoryObj = categories.find(c => c.name === resolvedParams.category);
  const categoryName = categoryObj ? categoryObj.name : resolvedParams.category;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title={cap(categoryName)} showChevron linkTo="/food" align="center" size="default" />
      <div className="flex-1 overflow-y-auto p-6">
        {items.length ? (
          <div className="flex-1 overflow-y-auto mb-6">
            {items.map((item) => (
              <FoodCardSlider
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
            <div className="text-gray-500 text-lg">
              {t('noItemsInCategory')}
            </div>
            <Button variant="secondary" asChild>
              <Link href="/food">
                {t('browseOtherCategories')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
