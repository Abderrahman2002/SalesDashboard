// src/redux/slices/salesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
        "reference": "P001",
        "nom": "Ordinateur Portable",
        "prix": 12000,
        "image": "./images/laptop.jpg",
        "categorie": "Informatique",
        "ventes_mensuelles": [10, 15, 12, 8, 20, 18, 22, 25, 19, 30, 28, 35]
        },
        {
        "reference": "P002",
        "nom": "Smartphone",
        "prix": 8000,
        "image": "./images/smartphone1.jpg",
        "categorie": "Informatique",
        "ventes_mensuelles": [25, 30, 22, 18, 35, 40, 38, 50, 45, 55, 60, 70]
        },
        {
        "reference": "P003",
        "nom": "Casque Audio",
        "prix": 1500,
        "image": "./images/headphone.jpg",
        "categorie": "Accessoires",
        "ventes_mensuelles": [12, 18, 15, 20, 22, 30, 35, 40, 42, 38, 50, 55]
        },
        {
        "reference": "P004",
        "nom": "Téléviseur 4K",
        "prix": 9000,
        "image": "./images/tv.jpg",
        "categorie": "Électronique",
        "ventes_mensuelles": [8, 12, 15, 10, 20, 18, 22, 30, 35, 28, 32, 40]
        },
        {
        "reference": "P005",
        "nom": "Tablette",
        "prix": 5000,
        "image": "./images/tablet.jpg",
        "categorie": "Informatique",
        "ventes_mensuelles": [14, 20, 18, 22, 28, 30, 25, 35, 40, 38, 42, 45]
        },
        {
        "reference": "P006",
        "nom": "Enceinte Bluetooth",
        "prix": 1200,
        "image": "./images/speaker.jpg",
        "categorie": "Accessoires",
        "ventes_mensuelles": [18, 22, 25, 28, 30, 35, 40, 42, 38, 50, 55, 60]
        }
  ],
  selectedCategory: 'all',
  activeTab: 'products'
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setSelectedCategory, setActiveTab, setData } = salesSlice.actions;
export default salesSlice.reducer;