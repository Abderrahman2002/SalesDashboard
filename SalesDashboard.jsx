import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ProductCard = ({ product }) => {
  const totalSales = product.ventes_mensuelles.reduce((sum, sales) => sum + sales, 0);
  const totalRevenue = totalSales * product.prix;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src={`/api/placeholder/96/96`}
            alt={product.nom}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{product.nom}</h3>
            <span className="px-2 py-1 rounded-full text-sm bg-gray-100">{product.categorie}</span>
          </div>
          <p className="text-sm text-gray-500">Réf: {product.reference}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Prix unitaire</p>
              <p className="font-semibold">{product.prix.toLocaleString()} MAD</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ventes totales</p>
              <p className="font-semibold">{totalSales} unités</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Chiffre d'affaires total</p>
            <p className="font-semibold text-green-600">{totalRevenue.toLocaleString()} MAD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ventes Totales</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Chiffre d'Affaires</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((product) => {
            const totalSales = product.ventes_mensuelles.reduce((sum, sales) => sum + sales, 0);
            const revenue = totalSales * product.prix;
            return (
              <tr key={product.reference} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.reference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full text-sm bg-gray-100">{product.categorie}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{product.prix.toLocaleString()} MAD</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{totalSales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{revenue.toLocaleString()} MAD</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const SalesDashboard = () => {
  const data = [
    {
      reference: "P001",
      nom: "Ordinateur Portable",
      prix: 12000,
      image: "laptop.png",
      categorie: "Informatique",
      ventes_mensuelles: [10, 15, 12, 8, 20, 18, 22, 25, 19, 30, 28, 35]
    },
    {
      reference: "P002",
      nom: "Smartphone",
      prix: 8000,
      image: "smartphone.png",
      categorie: "Informatique",
      ventes_mensuelles: [25, 30, 22, 18, 35, 40, 38, 50, 45, 55, 60, 70]
    },
    {
      reference: "P003",
      nom: "Casque Audio",
      prix: 1500,
      image: "headphone.png",
      categorie: "Accessoires",
      ventes_mensuelles: [12, 18, 15, 20, 22, 30, 35, 40, 42, 38, 50, 55]
    },
    {
      reference: "P004",
      nom: "Téléviseur 4K",
      prix: 9000,
      image: "tv.png",
      categorie: "Électronique",
      ventes_mensuelles: [8, 12, 15, 10, 20, 18, 22, 30, 35, 28, 32, 40]
    },
    {
      reference: "P005",
      nom: "Tablette",
      prix: 5000,
      image: "tablet.png",
      categorie: "Informatique",
      ventes_mensuelles: [14, 20, 18, 22, 28, 30, 25, 35, 40, 38, 42, 45]
    },
    {
      reference: "P006",
      nom: "Enceinte Bluetooth",
      prix: 1200,
      image: "speaker.png",
      categorie: "Accessoires",
      ventes_mensuelles: [18, 22, 25, 28, 30, 35, 40, 42, 38, 50, 55, 60]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('products');

  // Filter products by category
  const filteredData = selectedCategory === 'all' 
    ? data 
    : data.filter(product => product.categorie === selectedCategory);

  // Prepare data for pie chart
  const pieData = data.map(product => ({
    name: product.nom,
    value: product.ventes_mensuelles.reduce((sum, sales) => sum + (sales * product.prix), 0)
  }));

  // Prepare data for line chart
  const lineData = MONTHS.map((month, idx) => ({
    month,
    ...filteredData.reduce((acc, product) => ({
      ...acc,
      [product.nom]: product.ventes_mensuelles[idx] * product.prix
    }), {})
  }));

  const categories = ['all', ...new Set(data.map(product => product.categorie))];

  const totalRevenue = data.reduce((sum, product) => 
    sum + product.ventes_mensuelles.reduce((s, sales) => s + (sales * product.prix), 0), 0
  );
  const totalSales = data.reduce((sum, product) => 
    sum + product.ventes_mensuelles.reduce((s, sales) => s + sales, 0), 0
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de Bord des Ventes</h1>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Toutes les catégories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Chiffre d'Affaires Total</h3>
          <p className="text-2xl font-bold mt-2">{totalRevenue.toLocaleString()} MAD</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Ventes Totales</h3>
          <p className="text-2xl font-bold mt-2">{totalSales.toLocaleString()} unités</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Nombre de Produits</h3>
          <p className="text-2xl font-bold mt-2">{data.length}</p>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-4">
          {['products', 'charts', 'table'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab 
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map(product => (
              <ProductCard key={product.reference} product={product} />
            ))}
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Évolution des Ventes Mensuelles</h3>
              <LineChart width={600} height={300} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {filteredData.map((product, index) => (
                  <Line
                    key={product.reference}
                    type="monotone"
                    dataKey={product.nom}
                    stroke={COLORS[index % COLORS.length]}
                  />
                ))}
              </LineChart>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Répartition du Chiffre d'Affaires</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="bg-white rounded-lg shadow">
            <CustomTable data={filteredData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;