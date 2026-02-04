import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import { useEffect, useState } from "react";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
   
    fetch("http://localhost:5000/meals-limit-6")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/reviews")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50">

     
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Taste the Love of <br /> Home-Cooked Meals
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Experience authentic flavors from your neighbors' kitchens delivered to your doorstep.
          </p>
          <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition">
            Explore Menus
          </button>
        </motion.div>
      </section>

      <Container>
      
        <section className="py-20">
          <Heading title="Today's Specials" subtitle="Freshly prepared by our top local chefs" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {meals.map((meal) => (
              <div key={meal._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border">
                <img src={meal.image} alt={meal.name} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{meal.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{meal.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-teal-600 font-bold text-lg">${meal.price}</span>
                    <button className="btn btn-sm bg-teal-500 text-white border-none">Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

       
        <section className="py-20">
          <Heading title="What Our Customers Say" subtitle="Real feedback from our food community" center />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-xl shadow-sm border italic text-gray-600">
                "{review.comment}"
                <div className="mt-4 font-bold not-italic text-black">— {review.userName}</div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Home;
