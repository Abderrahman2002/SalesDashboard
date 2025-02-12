// Import hooks from react-redux to interact with the Redux store
import { useSelector, useDispatch } from 'react-redux';
// Import actions from the sales slice
import { setSelectedCategory, setActiveTab } from '../redux/slices/salesSlice';
// Import components from recharts for charts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// Import icons from lucide-react
import { BarChart3, ShoppingCart, Package2, Filter, ChevronDown } from 'lucide-react';
// Import custom components
import ProductCard from './ProductCard';
import CustomTable from './CustomTable';

// Define constants for months and colors
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const SalesDashboard = () => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const { data, selectedCategory, activeTab } = useSelector(state => state.sales); // Get state from Redux store

  // Filter data based on selected category
  const filteredData = selectedCategory === 'all' 
    ? data 
    : data.filter(product => product.categorie === selectedCategory);

  // Prepare data for the pie chart
  const pieData = data.map(product => ({
    name: product.nom,
    value: product.ventes_mensuelles.reduce((sum, sales) => sum + (sales * product.prix), 0)
  }));

  // Prepare data for the line chart
  const lineData = MONTHS.map((month, idx) => ({
    month,
    ...filteredData.reduce((acc, product) => ({
      ...acc,
      [product.nom]: product.ventes_mensuelles[idx] * product.prix
    }), {})
  }));

  // Get unique categories from data
  const categories = ['all', ...new Set(data.map(product => product.categorie))];

  // Calculate total revenue
  const totalRevenue = data.reduce((sum, product) => 
    sum + product.ventes_mensuelles.reduce((s, sales) => s + (sales * product.prix), 0), 0
  );
  
  // Calculate total sales
  const totalSales = data.reduce((sum, product) => 
    sum + product.ventes_mensuelles.reduce((s, sales) => s + sales, 0), 0
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord des Ventes</h1>
        <div className="relative">
          <select 
            value={selectedCategory} 
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Toutes les catégories' : category}
              </option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Chiffre d&apos;Affaires Total</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalRevenue.toLocaleString()} MAD</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ventes Totales</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalSales.toLocaleString()} unités</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nombre de Produits</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{data.length}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {[
            { id: 'products', label: 'Produits' },
            { id: 'charts', label: 'Graphiques' },
            { id: 'table', label: 'Tableau' }
          ].map(({ id, label }) => (
            <button 
              key={id} 
              onClick={() => dispatch(setActiveTab(id))} 
              className={`
                px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200
                ${activeTab === id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map(product => (
              <ProductCard key={product.reference} product={product} />
            ))}
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Ventes Mensuelles</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    {filteredData.map((product, idx) => (
                      <Line 
                        key={product.reference} 
                        type="monotone" 
                        dataKey={product.nom} 
                        stroke={COLORS[idx % COLORS.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Répartition des Chiffres d&apos;Affaires</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={{ stroke: '#6B7280', strokeWidth: 1 }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => `${value.toLocaleString()} MAD`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="bg-white rounded-xl shadow-sm">
            <CustomTable data={filteredData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;