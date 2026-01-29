import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../Context/BookContext";
import Modal from "../Components/Modal";

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, updateBook, loading } = useContext(BookContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
    coverImage: null,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({ type: "", message: "" });

  // 🔹 Fetch book on mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBookById(id);
        setFormData({
          title: book.title,
          author: book.author,
          publishedDate: book.publishedDate,
          genre: book.genre,
          coverImage: null
        });
      } catch (err) {
        setModal({
          type: "error",
          message: err.message || "Failed to load book",
        });
        setShowModal(true);
      }
    };

    fetchBook();
  }, [id]);

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: e.target.files[0],
    }));
  };

  // 🔹 Validation (image optional)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.publishedDate) newErrors.publishedDate = "Date required";
    if (!formData.genre.trim()) newErrors.genre = "Genre required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateBook({
        id,
        ...formData,
      });

      setModal({
        type: "success",
        message: "Book updated successfully!",
      });
      setShowModal(true);
    } catch (err) {
      setModal({
        type: "error",
        message: err.message || "Update failed",
      });
      setShowModal(true);
    }
  };

  const handleSuccessConfirm = () => {
    setShowModal(false);
    navigate("/viewbook");
  };

  const handleErrorClose = () => {
    setShowModal(false);
  };

  if (loading) return <p>Loading book...</p>;

  return (
    <div className="book-form-container">
      <h3>Edit Book</h3>

      <form onSubmit={handleSubmit}>
        <label>Title*</label>
        <input name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Author*</label>
        <input name="author" value={formData.author} onChange={handleChange} />
        {errors.author && <p className="error">{errors.author}</p>}

        <label>Published Date*</label>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
        />

        <label>Genre*</label>
        <input name="genre" value={formData.genre} onChange={handleChange} />

        <label>Replace Cover Image</label>
        <input type="file" onChange={handleImageChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Book"}
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

export default EditBookForm;
