import { useEffect, useState } from "react";
import { createPlacemark } from "../services/placemarkService";
import { getTags } from "../services/tagService";
import type { PlacemarkClickInfo, Placemark } from "../types/placemark";
interface MapFormProps {
  initialCoords: PlacemarkClickInfo;
  onClose: () => void;
}

const MapForm = ({ initialCoords, onClose }: MapFormProps) => {
  const [formData, setFormData] = useState<Omit<Placemark, "id">>({
    name: "",
    x_coord: initialCoords.x_coord,
    y_coord: initialCoords.y_coord,
    address: initialCoords.address,
    tags: [],
  });

  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getTags().then(setAvailableTags);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "x_coord" || name === "y_coord" ? parseFloat(value) : value,
    }));
  };

  const toggleTagSelection = (tag: string) => {
    setFormData((prevData) => {
      const isSelected = prevData.tags.some((t) => t.name === tag);
      const newTags = isSelected
        ? prevData.tags.filter((t) => t.name !== tag)
        : [...prevData.tags, { name: tag }];
      return { ...prevData, tags: newTags };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPlacemark(formData);
    alert("Точка добавлена!");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-3 text-sm"
    >
      <input
        className="w-full border p-2 rounded"
        name="name"
        placeholder="Название"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 rounded"
        name="x_coord"
        placeholder="Широта"
        value={formData.x_coord}
        onChange={handleChange}
        required
        type="number"
      />
      <input
        className="w-full border p-2 rounded"
        name="y_coord"
        placeholder="Долгота"
        value={formData.y_coord}
        onChange={handleChange}
        required
        type="number"
      />
      <input
        className="w-full border p-2 rounded"
        name="address"
        placeholder="Адрес"
        value={formData.address}
        onChange={handleChange}
        required
      />

      {/* Кастомный мультивыбор */}
      <div className="relative">
        <div
          className="border p-2 rounded cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          {formData.tags.length
            ? formData.tags.map((t) => t.name).join(", ")
            : "Выберите теги"}
        </div>
        {dropdownOpen && (
          <div className="absolute mt-1 z-10 bg-white border rounded shadow w-full max-h-48 overflow-y-auto">
            {availableTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.tags.some((t) => t.name === tag)}
                  onChange={() => toggleTagSelection(tag)}
                  className="mr-2"
                />
                <span className="text-black">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>
    </form>
  );
};

export default MapForm;
