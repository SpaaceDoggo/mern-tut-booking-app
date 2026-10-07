type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRating = ({ selectedStars, onChange }: Props) => {
  const stars = ["1", "2", "3", "4", "5"];

  return (
    <div className="border-b border-slate-400 pb-2">
      <h4 className="font-medium text-gray-600">Property Rating: </h4>
      {stars.map((star) => (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
            className="rounded"
          />
          {star} Stars
        </label>
      ))}
    </div>
  );
};

export default StarRating;
