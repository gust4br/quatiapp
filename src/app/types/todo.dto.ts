// DTO for creating a single todo (matches backend CreateTodoDto)
// All fields except 'completed' are required
export interface CreateTodoDto {
  label: string;
  quantity: number;
  value: number;
  completed?: boolean;
}

// DTO for updating a todo (matches backend UpdateTodoDto)
// All fields are optional since it extends PartialType(CreateTodoDto)
export interface UpdateTodoDto {
  label?: string;
  quantity?: number;
  value?: number;
  completed?: boolean;
}
