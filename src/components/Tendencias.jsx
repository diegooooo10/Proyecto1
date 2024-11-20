export const Tendencias = () => {
  return (
    <section id="trending" className="flex flex-col justify-center p-5 dark:bg-slate-800">
      <h2 className="mb-4 text-2xl font-bold text-start text-tertiary dark:text-white">
        Trending Stays
      </h2>
      <div className="flex flex-wrap justify-center gap-5 space-y-8 lg:space-y-0 lg:grid lg:grid-rows-3 lg:grid-cols-2">
        <div className=" cardTrending h-96 lg:h-96 bg-Chicago lg:col-span-2">
          <div className="w-2/3 lg:w-full lg:text-end mt-14">
            <h3 className="text-xl font-bold text-white ">Chicago</h3>
            <p className="text-lg text-white">2 rooms, bathroom and kitchen.</p>
          </div>
        </div>
        <div className="cardTrending h-96 lg:h-full bg-LosAngeles lg:row-span-2 lg:row-start-2">
          <div className="w-2/3 lg:w-full mt-14 lg:text-end">
            <h3 className="text-xl font-bold text-white">Los Angeles</h3>
            <p className="text-lg text-white">
              4 rooms, 3 bathrooms, kitchen and private pool.
            </p>
          </div>
        </div>
        <div className="cardTrending h-96 lg:h-full bg-Miami lg:row-start-2 ">
          <div className="w-2/3 lg:w-full lg:text-end mt-14">
            <h3 className="text-xl font-bold text-white">Miami</h3>
            <p className="text-lg text-white">
              3 rooms, 2 bathrooms, kitchen and amazing sea view.
            </p>
          </div>
        </div>
        <div className="cardTrending h-96 lg:h-full bg-Bali lg:col-start-2 lg:row-start-3">
          <div className="w-2/3 lg:w-full lg:text-end mt-14">
            <h3 className="text-xl font-bold text-white">Bali</h3>
            <p className="text-lg text-white">
              2 rooms, 2 bathrooms, kitchen and private pool.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
