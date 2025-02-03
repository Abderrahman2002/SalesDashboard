import PropTypes from 'prop-types';

const CustomTable = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 m-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Référence</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Catégorie</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Prix</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Ventes Totales</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Chiffre d'Affaires</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((product) => {
            const totalSales = product.ventes_mensuelles.reduce((sum, sales) => sum + sales, 0);
            const totalRevenue = totalSales * product.prix;

            return (
              <tr key={product.reference} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{product.reference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.categorie}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.prix.toFixed(2)} MAD</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{totalSales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{totalRevenue.toFixed(2)} MAD</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

CustomTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired,
      prix: PropTypes.number.isRequired,
      categorie: PropTypes.string.isRequired,
      ventes_mensuelles: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default CustomTable;
