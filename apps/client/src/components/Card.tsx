interface Props {
  title: string;
  body: string;
  grad?: "green";
}

const Card: React.FC<Props> = ({ title, body, grad }) => {
  return (
    <div
      className={`block max-w-sm p-6 bg-white border ${
        grad === "green" ? "border-emerald-300" : "border-pink-300"
      } rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700`}
    >
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
        <div
          className={`h-1 mt-3 max-w-[33.333333%] bg-gradient-to-r ${
            grad === "green" ? "from-emerald-500" : "from-purple-500"
          } ${grad === "green" ? "to-cyan-500" : "to-pink-500"} rounded-full`}
        />
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
    </div>
  );
};

export default Card;
