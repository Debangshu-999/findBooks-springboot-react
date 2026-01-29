import { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const { addBook, loading, error} = useContext(BookContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
    coverImage: null,
  });

  const [errors, setErrors] = useState({});

  // 🔹 Handle text/date inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle image input
  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: e.target.files[0],
    }));
  };

  // 🔹 Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.publishedDate) {
      newErrors.publishedDate = "Published Date is required";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.coverImage) {
      newErrors.coverImage = "Cover image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    addBook({
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      publishedDate: formData.publishedDate,
      genre: formData.genre,
      coverImage: formData.coverImage,
    });

    navigate("/viewbook");
  };

  return (
    <div className="book-form-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        Back
      </button>

      <h3>Create New Book</h3>

      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <label>Title*</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        {/* Author */}
        <label>Author*</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        {errors.author && <p className="error">{errors.author}</p>}

        {/* Published Date */}
        <label>Published Date*</label>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.publishedDate && (
          <p className="error">{errors.publishedDate}</p>
        )}

        {/* Genre */}
        <label>Genre*</label>
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />
        {errors.genre && <p className="error">{errors.genre}</p>}

        {/* Cover Image */}
        <label>Cover Image*</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
        />
        {errors.coverImage && (
          <p className="error">{errors.coverImage}</p>
        )}

        {/* Submit */}
        <button type="submit" className="btn-submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
