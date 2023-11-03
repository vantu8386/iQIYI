import { Rankes } from "../entities/film.entiti";

const Rank = ({ ranks }: { ranks: Rankes[] }) => {
  return (
    <div>
      <div>
        <div>
          <img src="../../../images/download.png" alt="" />
        </div>
        <div className="my-5">
          <h1 className="text-2xl my-5">
            Tìm kiếm hót trên <span className="text-green-500 font-semibold animate-pulse">iQIYI</span>
          </h1>

          {ranks.length > 0 &&
            ranks.map((e, i) => (
              <p
                className={`text-xl my-3 ${
                  i === 0
                    ? "text-red-500 font-semibold hover:text-green-500 cursor-pointer animate-bounce "
                    : i === 1
                    ? " text-orange-400 hover:text-green-500 cursor-pointer"
                    : i === 2
                    ? "text-yellow-500 hover:text-green-500 cursor-pointer"
                    : "text-gray-400 hover:text-green-500 cursor-pointer"
                }`}
              >
                <span className="text-gray-500 font-semibold text-2xl mr-2">
                  {i + 1}.
                </span >
                {e.movie}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Rank;
