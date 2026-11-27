export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description?: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: 'popular', name: 'Popular', emoji: '⭐' },
  { id: 'appetizers', name: 'Appetizers', emoji: '🥗' },
  { id: 'mains', name: 'Main Course', emoji: '🍽️' },
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝' },
  { id: 'seafood', name: 'Seafood', emoji: '🦐' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰' },
];

export const menuItems: MenuItem[] = [
  // Popular
  { id: 'p1', name: 'Classic Burger', price: 12.99, category: 'popular', emoji: '🍔', description: 'Angus beef, cheese, lettuce, tomato', popular: true },
  { id: 'p2', name: 'Margherita Pizza', price: 14.99, category: 'popular', emoji: '🍕', description: 'Fresh mozzarella, basil, tomato sauce', popular: true },
  { id: 'p3', name: 'Caesar Salad', price: 9.99, category: 'popular', emoji: '🥗', description: 'Romaine, parmesan, croutons', popular: true },
  { id: 'p4', name: 'Grilled Salmon', price: 22.99, category: 'popular', emoji: '🐟', description: 'Atlantic salmon, lemon butter sauce', popular: true },
  { id: 'p5', name: 'Chicken Wings', price: 11.99, category: 'popular', emoji: '🍗', description: 'Buffalo sauce, ranch dip', popular: true },
  { id: 'p6', name: 'Iced Latte', price: 5.49, category: 'popular', emoji: '☕', description: 'Espresso, cold milk, ice', popular: true },

  // Appetizers
  { id: 'a1', name: 'Bruschetta', price: 8.99, category: 'appetizers', emoji: '🍞', description: 'Toasted bread, tomatoes, basil' },
  { id: 'a2', name: 'Mozzarella Sticks', price: 7.99, category: 'appetizers', emoji: '🧀', description: 'Fried, marinara sauce' },
  { id: 'a3', name: 'Spring Rolls', price: 6.99, category: 'appetizers', emoji: '🥟', description: 'Vegetable, sweet chili sauce' },
  { id: 'a4', name: 'Soup of the Day', price: 6.49, category: 'appetizers', emoji: '🍲', description: 'Chef\'s daily selection' },
  { id: 'a5', name: 'Garlic Bread', price: 4.99, category: 'appetizers', emoji: '🧄', description: 'Toasted with garlic butter' },
  { id: 'a6', name: 'Nachos', price: 9.99, category: 'appetizers', emoji: '🌮', description: 'Cheese, jalapeños, salsa, guac' },
  { id: 'a7', name: 'Calamari', price: 10.99, category: 'appetizers', emoji: '🦑', description: 'Fried rings, aioli sauce' },
  { id: 'a8', name: 'Edamame', price: 5.99, category: 'appetizers', emoji: '🫛', description: 'Steamed, sea salt' },

  // Main Course
  { id: 'm1', name: 'Grilled Salmon', price: 22.99, category: 'mains', emoji: '🐟', description: 'Atlantic salmon, lemon butter' },
  { id: 'm2', name: 'Ribeye Steak', price: 28.99, category: 'mains', emoji: '🥩', description: '12oz, mashed potatoes, veggies' },
  { id: 'm3', name: 'Roast Chicken', price: 18.99, category: 'mains', emoji: '🍗', description: 'Half chicken, herb jus, rice' },
  { id: 'm4', name: 'Lamb Chops', price: 26.99, category: 'mains', emoji: '🍖', description: 'Grilled, mint sauce, potatoes' },
  { id: 'm5', name: 'Fish & Chips', price: 16.99, category: 'mains', emoji: '🐠', description: 'Beer battered, tartar sauce' },
  { id: 'm6', name: 'BBQ Ribs', price: 24.99, category: 'mains', emoji: '🍖', description: 'Slow-cooked, BBQ glaze, slaw' },

  // Burgers
  { id: 'b1', name: 'Classic Burger', price: 12.99, category: 'burgers', emoji: '🍔', description: 'Angus beef, cheese, lettuce' },
  { id: 'b2', name: 'Bacon Burger', price: 14.99, category: 'burgers', emoji: '🍔', description: 'Double patty, bacon, cheddar' },
  { id: 'b3', name: 'Mushroom Swiss', price: 13.99, category: 'burgers', emoji: '🍔', description: 'Sautéed mushrooms, swiss cheese' },
  { id: 'b4', name: 'Veggie Burger', price: 11.99, category: 'burgers', emoji: '🌱', description: 'Plant-based patty, avocado' },
  { id: 'b5', name: 'Chicken Burger', price: 12.49, category: 'burgers', emoji: '🍔', description: 'Crispy chicken, coleslaw' },
  { id: 'b6', name: 'Blue Cheese Burger', price: 14.49, category: 'burgers', emoji: '🍔', description: 'Blue cheese, caramelized onions' },

  // Pizza
  { id: 'pz1', name: 'Margherita', price: 14.99, category: 'pizza', emoji: '🍕', description: 'Mozzarella, basil, tomato' },
  { id: 'pz2', name: 'Pepperoni', price: 15.99, category: 'pizza', emoji: '🍕', description: 'Pepperoni, mozzarella' },
  { id: 'pz3', name: 'Hawaiian', price: 15.99, category: 'pizza', emoji: '🍕', description: 'Ham, pineapple, mozzarella' },
  { id: 'pz4', name: 'BBQ Chicken', price: 16.99, category: 'pizza', emoji: '🍕', description: 'BBQ sauce, chicken, red onion' },
  { id: 'pz5', name: 'Vegetarian', price: 14.99, category: 'pizza', emoji: '🍕', description: 'Peppers, mushrooms, olives' },
  { id: 'pz6', name: 'Meat Lovers', price: 17.99, category: 'pizza', emoji: '🍕', description: 'Pepperoni, sausage, bacon, ham' },

  // Pasta
  { id: 'pa1', name: 'Spaghetti Bolognese', price: 14.99, category: 'pasta', emoji: '🍝', description: 'Beef ragù, parmesan' },
  { id: 'pa2', name: 'Fettuccine Alfredo', price: 13.99, category: 'pasta', emoji: '🍝', description: 'Cream sauce, parmesan' },
  { id: 'pa3', name: 'Penne Arrabbiata', price: 12.99, category: 'pasta', emoji: '🍝', description: 'Spicy tomato sauce, garlic' },
  { id: 'pa4', name: 'Carbonara', price: 14.99, category: 'pasta', emoji: '🍝', description: 'Egg, pancetta, pecorino' },
  { id: 'pa5', name: 'Lasagna', price: 15.99, category: 'pasta', emoji: '🍝', description: 'Layers of pasta, meat, béchamel' },
  { id: 'pa6', name: 'Pesto Pasta', price: 13.49, category: 'pasta', emoji: '🍝', description: 'Basil pesto, pine nuts' },

  // Seafood
  { id: 's1', name: 'Grilled Prawns', price: 19.99, category: 'seafood', emoji: '🦐', description: 'Garlic butter, lemon' },
  { id: 's2', name: 'Lobster Tail', price: 34.99, category: 'seafood', emoji: '🦞', description: 'Butter poached, drawn butter' },
  { id: 's3', name: 'Fish & Chips', price: 16.99, category: 'seafood', emoji: '🐠', description: 'Beer battered cod, fries' },
  { id: 's4', name: 'Seafood Platter', price: 38.99, category: 'seafood', emoji: '🦀', description: 'Prawns, mussels, calamari, fish' },
  { id: 's5', name: 'Salmon Teriyaki', price: 21.99, category: 'seafood', emoji: '🐟', description: 'Glazed salmon, rice, veggies' },
  { id: 's6', name: 'Tuna Steak', price: 24.99, category: 'seafood', emoji: '🐟', description: 'Seared, wasabi, soy glaze' },

  // Drinks
  { id: 'd1', name: 'Coca Cola', price: 2.99, category: 'drinks', emoji: '🥤', description: '330ml can' },
  { id: 'd2', name: 'Fresh Orange Juice', price: 4.99, category: 'drinks', emoji: '🍊', description: 'Freshly squeezed' },
  { id: 'd3', name: 'Iced Tea', price: 3.49, category: 'drinks', emoji: '🧊', description: 'Lemon or peach' },
  { id: 'd4', name: 'Espresso', price: 3.49, category: 'drinks', emoji: '☕', description: 'Double shot' },
  { id: 'd5', name: 'Cappuccino', price: 4.99, category: 'drinks', emoji: '☕', description: 'Espresso, steamed milk, foam' },
  { id: 'd6', name: 'Iced Latte', price: 5.49, category: 'drinks', emoji: '☕', description: 'Espresso, cold milk, ice' },
  { id: 'd7', name: 'Smoothie', price: 6.99, category: 'drinks', emoji: '🥤', description: 'Mixed berries, banana' },
  { id: 'd8', name: 'Mineral Water', price: 2.49, category: 'drinks', emoji: '💧', description: 'Sparkling or still, 500ml' },
  { id: 'd9', name: 'Craft Beer', price: 7.99, category: 'drinks', emoji: '🍺', description: 'Local IPA, 330ml' },
  { id: 'd10', name: 'House Wine', price: 8.99, category: 'drinks', emoji: '🍷', description: 'Red or white, glass' },
  { id: 'd11', name: 'Lemonade', price: 3.99, category: 'drinks', emoji: '🍋', description: 'Fresh, house-made' },
  { id: 'd12', name: 'Milkshake', price: 6.49, category: 'drinks', emoji: '🥛', description: 'Chocolate, vanilla, or strawberry' },

  // Desserts
  { id: 'de1', name: 'Tiramisu', price: 8.99, category: 'desserts', emoji: '🍰', description: 'Classic Italian, espresso' },
  { id: 'de2', name: 'Chocolate Lava Cake', price: 9.99, category: 'desserts', emoji: '🍫', description: 'Warm, vanilla ice cream' },
  { id: 'de3', name: 'Cheesecake', price: 8.49, category: 'desserts', emoji: '🍰', description: 'New York style, berry compote' },
  { id: 'de4', name: 'Ice Cream', price: 5.99, category: 'desserts', emoji: '🍨', description: '3 scoops, choice of flavors' },
  { id: 'de5', name: 'Crème Brûlée', price: 8.99, category: 'desserts', emoji: '🍮', description: 'Vanilla custard, caramelized sugar' },
  { id: 'de6', name: 'Apple Pie', price: 7.99, category: 'desserts', emoji: '🥧', description: 'Warm, cinnamon, ice cream' },
  { id: 'de7', name: 'Panna Cotta', price: 7.49, category: 'desserts', emoji: '🍮', description: 'Vanilla, berry sauce' },
  { id: 'de8', name: 'Brownie', price: 6.99, category: 'desserts', emoji: '🍫', description: 'Warm, chocolate sauce, ice cream' },
];
