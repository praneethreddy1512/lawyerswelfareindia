interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function toast({ title, description, variant = 'default' }: ToastProps) {
  console.log(`[Toast] ${variant.toUpperCase()}: ${title} - ${description}`)
}