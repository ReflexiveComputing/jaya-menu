import { redirect } from 'next/navigation'

export default function FlavarIndex() {
  // Redirect plain /food/flavar -> /food
  redirect('/food')
}
