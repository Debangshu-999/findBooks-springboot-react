import { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

const BookForm = ({ mode }) => {
  const { addBook, loading, error } = useContext(BookContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
    coverImage: null,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({
    type: "",
    message: "",
  });

  // Handle text/date inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image input
  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: e.target.files[0],
    }));
  };

  // Validation
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



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


   const handleSuccessConfirm = () => {
      setShowModal(false);
      navigate("/viewbook");
    };

    const handleErrorClose = () => {
      setShowModal(false);
    };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const savedBook = await addBook({
        title: formData.title,
        author: formData.author,
        publishedDate: formData.publishedDate,
        genre: formData.genre,
        coverImage: formData.coverImage,
      });

      setShowModal(true);
      setModal({
        type: "success",
        message: "Book added successfully!",
      });

      setFormData({
        title: "",
        author: "",
        publishedDate: "",
        genre: "",
        coverImage: null,
      });
      setErrors({});

    } catch (err) {
      setShowModal(true);
      setModal({
        type: "error",
        message: err.message || "Failed to add book",
      });
    }

  };

  return (
    <div className="book-form-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        Back
      </button>

      <h3>Create New Book</h3>

      <form onSubmit={handleSubmit} noValidate>
        <p>{error && error}</p>

        <label>Title*</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Author*</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        {errors.author && <p className="error">{errors.author}</p>}

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

        <label>Genre*</label>
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />
        {errors.genre && <p className="error">{errors.genre}</p>}

        <label>Cover Image*</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
        />

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>

      {showModal && (
        <Modal
          type={modal.type}
          message={modal.message}
          onConfirm={handleSuccessConfirm}
          onClose={handleErrorClose}
        />
      )}
    </div>
  );
};
export default BookForm;
