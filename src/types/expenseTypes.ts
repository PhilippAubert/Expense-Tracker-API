export type Expenses = Array<Expense>

export type Expense = {
    id: number,
    userId: number;
    title: string,
    category: Category,
    expense: number
    createdAt: Date,
    updatedAt: Date,
}

enum Category {
    Groceries = "groceries",
    Electronics = "electronics",
    Gear="gear",
    Restaurants = "restaurants",
    Books = "books",
    Sports = "sports",
    Utilities = "utilities",
    Clothing = "clothing",
    Others = "others"
}