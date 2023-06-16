 import { useState } from 'react';

 const SearchBar = ({ handleSearch }) => {
   const [searchTerm, setSearchTerm] = useState('');

   const handleChange = (e) => {
     setSearchTerm(e.target.value);
   };

   const handleSubmit = (e) => {
    e.preventDefault();
     handleSearch(searchTerm);   };

  const handleClear = () => {
     setSearchTerm('');
    handleSearch('');
   };

  return (
    <>
   
      <h3 className="flex justify-center  font-medium mt-8 text-sm text-gray-400">Click on coin image for more information</h3>
    </>
   );
 };

 export default SearchBar;


// had some errors from CoinGecko

 //<form onSubmit={handleSubmit} className=" flex gap-4 my-4">
 //      <input
//         type="text"
//         placeholder="Search by coin name"
//         value={searchTerm}
//         onChange={handleChange}
//         className="coin_input"
//       />
//       {searchTerm && (
//         <button 
//           type="button" 
//           onClick={handleClear}
//           className="coin_search bg-purple-400 text-sm"
//           >
//           Clear
//         </button>
//       )}
//       <button 
//         type="submit" 
//         className="coin_search  bg-green-300 text-s"
//         >
//         Search
//       </button>
//     </form>