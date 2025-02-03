import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const totalSales = product.ventes_mensuelles.reduce((sum, sales) => sum + sales, 0);
  const totalRevenue = totalSales * product.prix;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative mb-6 overflow-hidden rounded-lg">
        <img 
          src={product.image} 
          alt={product.nom} 
          className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300" 
        />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">{product.nom}</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="font-medium text-gray-500">Référence</span>
          <span className="text-gray-800">{product.reference}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="font-medium text-gray-500">Catégorie</span>
          <span className="text-gray-800">{product.categorie}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="font-medium text-gray-500">Prix</span>
          <span className="text-gray-800 font-semibold">{product.prix} MAD</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="font-medium text-gray-500">Ventes totales</span>
          <span className="text-gray-800">{totalSales} unités</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="font-medium text-gray-500">Chiffre d'affaires</span>
          <span className="text-green-600 font-bold">{totalRevenue.toLocaleString()} MAD</span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    reference: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    ventes_mensuelles: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default ProductCard;
