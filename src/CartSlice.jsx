import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const numericCost = parseFloat(cost.replace('$', '')); // Convert cost to a number
        
        console.log("Adding my item to cart:", { name, image, cost: numericCost });
      
        const existingItem = state.items.find(item => item.name === name);
      
        if (existingItem) {
          // You can safely mutate `existingItem` here since Redux Toolkit handles immutability
          existingItem.quantity++;
        } else {
          // Push a new item to the array
          state.items.push({ name, image, cost: numericCost, quantity: 1 });
        }
      
        // Log the updated state properly, converting the state to a plain object for better debugging
        console.log("Updated cart items:", JSON.parse(JSON.stringify(state.items)));
      },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
