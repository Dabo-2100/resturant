
import { create } from "zustand";
// set Function can update any state into the object of global state
export const useCategories = create((set) => (
    {
        domain: "http://localhost:1337",

        data: [
            // { documentId: 1, name: "Cold Drinks", path: "cold", imgUrl: coldImg },
            // { documentId: 2, name: "Burgers", path: "burgers", imgUrl: dessertImg },
            // { documentId: 3, name: "Pizza", path: "pizza", imgUrl: coldImg },
            // { documentId: 4, name: "Wok", path: "wok", imgUrl: wokImg },
            // { documentId: 5, name: "Desserts", path: "dessert", imgUrl: dessertImg },
            // { documentId: 6, name: "Pasta", path: "pasta", imgUrl: wokImg },
        ],


        active_cat_id: 0,
        // Method
        setData: (categories) => (set(() => ({ data: categories }))),
        setActiveId: (activeTab) => (set(() => ({ active_cat_id: activeTab }))),
        resetActiveId: () => (set(() => ({ active_cat_id: 0 })))
    }
))

export const useCart = create((set) => ({
    productsInCart: [],
    cartIndex: false,
    checkOutIndex: false,

    openCart: () => (set(() => ({ cartIndex: true }))),
    closeCart: () => (set(() => ({ cartIndex: false }))),

    openCheckOut: () => (set(() => ({ checkOutIndex: true }))),
    closeCheckOut: () => (set(() => ({ checkOutIndex: false }))),

    decrementQty: (documentId) => (set((state) => {
        let copyArray = [...state.productsInCart];
        let index = copyArray.findIndex(el => el.documentId == documentId);

        if (copyArray[index].qty > 1) {
            copyArray[index].qty--;
        } else {
            copyArray.splice(index, 1);
        }
        return { productsInCart: copyArray }
    })),

    incrementQty: (documentId) => (set((state) => {
        let copyArray = [...state.productsInCart];
        let index = copyArray.findIndex(el => el.documentId == documentId);
        copyArray[index].qty++;
        return { productsInCart: copyArray }
    })),

    addToCart: (product) => (set((state) => {
        let copy = [...state.productsInCart];
        let obj = copy.find(el => el.documentId == product.documentId);
        if (obj) {
            // increment
            state.incrementQty(product.documentId);
        } else {
            copy.push(product);
        }
        return { productsInCart: copy }
    })),

    resetCart: () => (set(() => ({ productsInCart: [] })))
}));


export const useInvoiceDetails = create((set) => ({
    index: false,
    activeInvoiceId: null,
    openDetails: () => (set(() => ({ index: true }))),
    closeDetails: () => (set(() => ({ index: false }))),
    
    setActiveId: (id) => (set(() => ({ activeInvoiceId: id }))),
    resetActiveId: () => (set(() => ({ activeInvoiceId: null })))
}))