// src/SalesDashboard.jsx

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory, setActiveTab } from '../redux/slices/salesSlice';
import ProductCard from './ProductCard';
import CustomTable from './CustomTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const SalesDashboard = () => {
  const dispatch = useDispatch();
  const { data, selectedCategory, activeTab } = useSelector(state => state.sales);

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
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
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
          <h3 className="text-sm font-medium text-gray-500">Chiffre dAffaires Total</h3>
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
              onClick={() => dispatch(setActiveTab(tab))} 
              className={`px-4 py-2 text-lg ${activeTab === tab ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
            >
              {tab === 'products' ? 'Produits' : tab === 'charts' ? 'Graphiques' : 'Tableau'}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredData.map(product => (
            <ProductCard key={product.reference} product={product} />
          ))}
        </div>
      )}

      {activeTab === 'charts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Ventes Mensuelles</h3>
            <LineChart width={500} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {filteredData.map((product, idx) => (
                <Line key={idx} type="monotone" dataKey={product.nom} stroke={COLORS[idx]} />
              ))}
            </LineChart>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Répartition des Chiffres dAffaires</h3>
            <PieChart width={500} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%" cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      )}

      {activeTab === 'table' && <CustomTable data={filteredData} />}
    </div>
  );
};

export default SalesDashboard;
