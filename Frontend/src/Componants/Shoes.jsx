// import { useState } from "react";

// const shoesData = [
//   { id: 1, name: "Nike Air Zoom", price: 2499, oldPrice: 3999, img: "https://images.unsplash.com/photo-1606813902771-1cf5d3d6b96d?w=400" },
//   { id: 2, name: "Adidas Running Shoes", price: 1999, oldPrice: 2999, img: "https://images.unsplash.com/photo-1528701800489-20be7c08f9c9?w=400" },
//   { id: 3, name: "Puma Sneakers", price: 1499, oldPrice: 2499, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400" },
//   { id: 4, name: "Campus Casuals", price: 999, oldPrice: 1599, img: "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400" },
// ];

// export default function shoes() {
//   const [shoes] = useState(shoesData);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Shoes Collection</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {shoes.map((shoe) => (
//           <div
//             key={shoe.id}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
//           >
//             <div className="p-4">
//               <img
//                 src={shoe.img}
//                 alt={shoe.name}
//                 className="w-full h-40 object-cover mb-3 rounded-xl"
//               />
//               <h2 className="text-lg font-semibold">{shoe.name}</h2>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-xl font-bold">₹{shoe.price}</span>
//                 <span className="line-through text-gray-500">₹{shoe.oldPrice}</span>
//                 <span className="text-green-600 font-medium">
//                   {Math.round(((shoe.oldPrice - shoe.price) / shoe.oldPrice) * 100)}% off
//                 </span>
//               </div>
//               <button className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Shoes() {
  const shoes = [
    { id: 1, name: "Nike Air Zoom", price: "₹2499", image: "data:image/jpeg;base64,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", category: "Nike" },
    { id: 2, name: "Adidas Running Shoes", price: "₹1999", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR1sbReHKK2tp5tiEcmNbZXNJ3NPfTv1Im6GiVpTGJw2CntqLTZizDaMvmryAf3N4H6PC4ySZ0otDXo1neHqVKUkWmUcILZ63C_zkp68D7xfIf5DTuaIFiOOA", category: "Adidas" },
    { id: 3, name: "Puma Sneakers", price: "₹1499", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQa9wH6ZguyDgd3VxX4UvJkUmyiY-Kdq7QxInzRKy6mmuLFm6ZDh1MhAPdyswSzxnfA2VU46yb4EGtlRiHBPb1xoNwIMq_o4pzkgF_hEPKzheufja_-h1ed1g", category: "Puma" },
    { id: 4, name: "Campus Casuals", price: "₹999", image: "data:image/jpeg;base64,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", category: "Campus" },
     { id: 2, name: "Adidas Running Shoes", price: "₹1999", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR1sbReHKK2tp5tiEcmNbZXNJ3NPfTv1Im6GiVpTGJw2CntqLTZizDaMvmryAf3N4H6PC4ySZ0otDXo1neHqVKUkWmUcILZ63C_zkp68D7xfIf5DTuaIFiOOA", category: "Adidas" },
    { id: 3, name: "Puma Sneakers", price: "₹1499", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQa9wH6ZguyDgd3VxX4UvJkUmyiY-Kdq7QxInzRKy6mmuLFm6ZDh1MhAPdyswSzxnfA2VU46yb4EGtlRiHBPb1xoNwIMq_o4pzkgF_hEPKzheufja_-h1ed1g", category: "Puma" },
        { id: 2, name: "Adidas Running Shoes", price: "₹1999", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR1sbReHKK2tp5tiEcmNbZXNJ3NPfTv1Im6GiVpTGJw2CntqLTZizDaMvmryAf3N4H6PC4ySZ0otDXo1neHqVKUkWmUcILZ63C_zkp68D7xfIf5DTuaIFiOOA", category: "Adidas" },
    { id: 3, name: "Puma Sneakers", price: "₹1499", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQa9wH6ZguyDgd3VxX4UvJkUmyiY-Kdq7QxInzRKy6mmuLFm6ZDh1MhAPdyswSzxnfA2VU46yb4EGtlRiHBPb1xoNwIMq_o4pzkgF_hEPKzheufja_-h1ed1g", category: "Puma" },
    
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ Apply both brand filter & search filter
  const filteredShoes = shoes.filter((item) => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-primary">
            <span className="text-dark">Shop Now</span>
          </Link>

          <form
            className="d-flex mx-auto w-50"
            onSubmit={(e) => e.preventDefault()} // prevent refresh
          >
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search Shoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)} // ✅ live search
            />
            <button className="btn btn-primary rounded-pill ms-2 px-4" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-dark me-3 rounded-pill px-3">
              <i className="bi bi-person me-2"></i> Profile
            </Link>
            <Link to="/cart" className="btn btn-outline-dark rounded-pill px-3">
              <i className="bi bi-cart-fill me-2"></i> Cart
            </Link>
          </div>
        </div>
      </nav>

      {/* ✅ Main Container */}
      <div className="container my-3">

        {/* 🏷️ Brand Filter Buttons */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {["All", "Nike", "Adidas", "Puma", "Campus"].map((brand) => (
            <button
              key={brand}
              className={`btn btn-sm rounded-pill px-3 ${
                filter === brand ? "btn-dark text-white" : "border"
              }`}
              onClick={() => setFilter(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* 👟 Shoes Grid */}
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {filteredShoes.map((item) => (
            <div className="col" key={item.id}>
              <div className="card shadow-sm h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="fw-bold mb-1">{item.price}</p>
                  <button className="btn btn-sm btn-dark w-100 rounded-pill">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredShoes.length === 0 && <p>No shoes found 😢</p>}
        </div>
      </div>
    </>
  );
}
