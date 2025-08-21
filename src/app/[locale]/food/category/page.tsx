import { redirect } from 'next/navigation'

export default function CategoryIndex() {
  // Redirect plain /food/category -> /food
  redirect('/food')
}
