"use client";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

const Input = ({ searchTerm, setSearchTerm }: Props) => {
  console.log("render edildi Input bileşen!");
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Kullanıcı ara..."
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
};

export default Input;
