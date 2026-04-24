export interface TodoItem {
  id?: string,
  label: string,
  completed: boolean,
  quantity: number,
  value: number,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string | null
}