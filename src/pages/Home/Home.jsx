const Home = () => {
  return (
    <div className="bg-gray-50">

    
      <section className="bg-lime-500 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to LocalChefBazaar
        </h1>
        <p className="max-w-xl mx-auto">
          Discover fresh homemade meals from talented local chefs. Enjoy healthy, affordable food prepared with love.
        </p>
      </section>

     
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          What is LocalChefBazaar?
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600">
          LocalChefBazaar connects home cooks with customers who love homemade food. Customers can browse menus, place orders, and track delivery in real time. Home chefs can earn money by selling meals directly from their kitchens.
        </p>
      </section>

     
      <section className="py-16 bg-white">
        <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Browse Meals</h3>
            <p className="text-gray-600">
              Explore daily menus prepared by trusted local chefs.
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Order & Payment</h3>
            <p className="text-gray-600">
              Place orders easily and pay securely through the platform.
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Ratings & Reviews</h3>
            <p className="text-gray-600">
              Share feedback and help improve food quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
