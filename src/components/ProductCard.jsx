import PropTypes from 'prop-types';
// Import icons from lucide-react
import { TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart, BarChart2 } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Calculate total sales
  const totalSales = product.ventes_mensuelles.reduce((sum, sales) => sum + sales, 0);
  // Calculate total revenue
  const totalRevenue = totalSales * product.prix;
  
  // Calculate trend (comparing last two months)
  const lastMonth = product.ventes_mensuelles[product.ventes_mensuelles.length - 1];
  const previousMonth = product.ventes_mensuelles[product.ventes_mensuelles.length - 2];
  const trend = lastMonth > previousMonth;
  const trendPercentage = ((lastMonth - previousMonth) / previousMonth * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden">
        <img 
          src={product.image} // Use the image property from the product data
          alt={product.nom}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/images/default.jpg';
            e.currentTarget.classList.add('object-contain', 'p-4');
          }}
        />
        <div className="absolute top-4 right-4">
          <span className={`
            inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${trend ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            shadow-sm
          `}>
            {trend ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {trendPercentage}%
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900">{product.nom}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Package className="w-3 h-3 mr-1" />
              {product.categorie}
            </span>
          </div>
          <p className="text-sm text-gray-500">Ref: {product.reference}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="text-sm">Prix unitaire</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{product.prix.toLocaleString()} MAD</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="text-sm">Ventes totales</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{totalSales.toLocaleString()}</p>
          </div>
        </div>

        {/* Revenue Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center text-blue-600 mb-1">
            <BarChart2 className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Chiffre d&apos;affaires total</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{totalRevenue.toLocaleString()} MAD</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    reference: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    ventes_mensuelles: PropTypes.arrayOf(PropTypes.number).isRequired,
    image: PropTypes.string.isRequired, // Add image to prop types
  }).isRequired,
};

export default ProductCard;