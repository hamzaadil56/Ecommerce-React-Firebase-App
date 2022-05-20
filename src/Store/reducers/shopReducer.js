import { products } from "../../data";
import { ACTIONS } from "../action";
const allCategories = [
  "all",
  ...new Set(products.map((item) => item.category)),
];
const allPrices = [...new Set(products.map((item, index) => item.price))];
let maxPrice = Math.max(...allPrices);
let minPrice = Math.min(...allPrices);
const initial_state = {
  shopItems: products,
  allCategories: allCategories,
  filteredCategories: products,
  initialValue: maxPrice,
  maxValue: maxPrice,
  minValue: minPrice,
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
  isAuthenticated: false,
  currentUser: {},
  isLoading: false,
  order_details: {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    totalItems: 0,
    totalPrice: 0,
  },
};
const shopReducer = (state = initial_state, action) => {
  if (action.type === ACTIONS.FILTER_CATEGORY) {
    let activeCategory = products.filter(
      (item) => action.payload === item.category
    );
    if (action.payload === "all") {
      activeCategory = products;
    }
    return {
      ...state,
      shopItems: activeCategory,
      filteredCategories: activeCategory,
    };
  }

  if (action.type === ACTIONS.FILTER_COLOR) {
    let newColorCategory = state.filteredCategories.filter(
      (item) => action.payload === item.color
    );
    if (action.payload === "all") {
      newColorCategory = state.filteredCategories;
    }

    return {
      ...state,
      shopItems: newColorCategory,
    };
  }
  if (action.type === ACTIONS.FILTER_PRICE) {
    let newPriceCategory = state.filteredCategories.filter(
      (item) => item.price <= action.payload
    );
    return {
      ...state,
      shopItems: newPriceCategory,
      initialValue: action.payload,
    };
  }

  if (action.type === ACTIONS.SORT_BY_HIGHEST) {
    let sortedItems = state.filteredCategories.sort((a, b) => {
      if (action.payload === "highest") {
        return b.price - a.price;
      }
      if (action.payload === "lowest") {
        return a.price - b.price;
      }
      if (action.payload === "asc") {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
      }
      if (action.payload === "dsc") {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        if (b.title.toLowerCase() < a.title.toLowerCase()) {
          return 1;
        }
      }
      return 0;
    });

    console.log(sortedItems, "sortedItems");
    return {
      ...state,
      shopItems: sortedItems,
    };
  }

  if (action.type === ACTIONS.SORT_BY_A_Z) {
    let sortByLowest = state.filteredCategories.map((item) => item.title);
    return {
      ...state,
      shopItems: sortByLowest,
    };
  }
  if (action.type === ACTIONS.ADD_TO_CART) {
    let insideCart = state.shopItems.filter((item) => {
      return item.id === action.payload;
    });
    let newCartItems = state.cartItems.concat(insideCart);
    console.log(newCartItems, "newCart");
    const uniqueCartItems = [
      ...newCartItems
        .reduce((map, obj) => map.set(obj.id, obj), new Map())
        .values(),
    ];
    console.log(uniqueCartItems, "uniquevalues");

    return {
      ...state,
      cartItems: uniqueCartItems,
    };
  }
  if (action.type === ACTIONS.ADD_ITEM) {
    let newCart = state.cartItems.filter((item, number) => {
      if (item.id === action.payload) {
        item.piece += 1;
      }
      return item;
    });

    return {
      ...state,
      cartItems: newCart,
    };
  }
  if (action.type === ACTIONS.SUBTRACT_ITEM) {
    let newCart = state.cartItems.filter((item, number) => {
      if (item.id === action.payload) {
        item.piece -= 1;
      }
      if (item.piece === 0) {
        return item.id !== action.payload;
      }
      return item;
    });

    return {
      ...state,
      cartItems: newCart,
    };
  }
  if (action.type === ACTIONS.GET_TOTAL_ITEMS) {
    let { totalItems, totalPrice } = state.cartItems.reduce(
      (totalValues, cartItem) => {
        const { price, piece } = cartItem;
        totalValues.totalItems += piece;
        let itemPrices = price * piece;
        totalValues.totalPrice += itemPrices;
        return totalValues;
      },
      {
        totalItems: 0,
        totalPrice: 0,
      }
    );

    return { ...state, totalItems: totalItems, totalPrice: totalPrice };
  }
  if (action.type === ACTIONS.REMOVE_ITEM) {
    let newCartItems = state.cartItems.filter((item) => {
      if (item.id === action.payload) {
        item.piece = 0;
      }
      return item.id !== action.payload;
    });
    return {
      ...state,
      cartItems: newCartItems,
    };
  }
  if (action.type === ACTIONS.SEARCH) {
    let searchedItems = state.filteredCategories.filter((item) => {
      if (action.payload === "") {
        return item;
      }
      if (item.title.toLowerCase().includes(action.payload.toLowerCase())) {
        return item;
      }
      return 0;
    });
    return {
      ...state,
      shopItems: searchedItems,
    };
  }
  if (action.type === ACTIONS.AUTHENTICATION) {
    return {
      ...state,
      isAuthenticated: true,
      currentUser: action.payload,
    };
  }
  if (action.type === ACTIONS.SET_USERS) {
    return {
      ...state,
    };
  } else {
    return state;
  }
};
export default shopReducer;
