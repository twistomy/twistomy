const Home = () => {
  return (
    <main className="p-8 bg-white text-black">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="mx-auto flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-lg text-gray-600">
              Your one-stop solution for all your needs.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              className="w-full max-w-md mx-auto md:mx-0"
              src="/path-to-your-hero-image.jpg"
              alt="Hero"
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              className="w-full h-48 object-cover mb-4"
              src="/path-to-detail-image1.jpg"
              alt="Detail 1"
            />
            <p className="text-gray-700">
              Detail 1: Description about the first detail.
            </p>
          </div>
          <div className="text-center">
            <img
              className="w-full h-48 object-cover mb-4"
              src="/path-to-detail-image2.jpg"
              alt="Detail 2"
            />
            <p className="text-gray-700">
              Detail 2: Description about the second detail.
            </p>
          </div>
          <div className="text-center">
            <img
              className="w-full h-48 object-cover mb-4"
              src="/path-to-detail-image3.jpg"
              alt="Detail 3"
            />
            <p className="text-gray-700">
              Detail 3: Description about the third detail.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
