export type Category = {
  id: string
  title: string
  description: string
  background: string
  image: string
  addedOn: number // timestamp
  items?: any[] // Optional, can be an array of products or undefined
  isAdminMode?: boolean // Optional, used for admin actions
}
