import { useState, useContext, useEffect } from "react";
import { BookContext } from "../Context/BookContext";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Components/Modal";

const BookForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const {
    addBook,
    updateBook,
    getBookById,
    loading,
    error,
  } = useContext(BookContext);

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

  /* ============================
     Fetch book in EDIT mode
     ============================ */
  useEffect(() => {
    if (!isEditMode) return;

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
  }, [id, isEditMode]);

  /* ============================
     Handlers
     ============================ */
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

  /* ============================
     Validation
     ============================ */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.publishedDate)
      newErrors.publishedDate = "Published date is required";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required";

    // Image required only in ADD mode
    if (!isEditMode && !formData.coverImage) {
      newErrors.coverImage = "Cover image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ============================
     Submit
     ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await updateBook({
          id,
          ...formData,
        });

        setModal({
          type: "success",
          message: "Book updated successfully!",
        });
      } else {
        await addBook({
          ...formData,
        });

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
      }

      setErrors({});
      setShowModal(true);
    } catch (err) {
      setModal({
        type: "error",
        message: err.message || "Operation failed",
      });
      setShowModal(true);
    }
  };

  /* ============================
     Modal handlers
     ============================ */
  const handleSuccessConfirm = () => {
    setShowModal(false);
    navigate("/viewbook");
  };

  const handleErrorClose = () => {
    setShowModal(false);

    if(isEditMode){
      navigate('/viewbook')
    }
  };

  /* ============================
     Render
     ============================ */
  if (loading && isEditMode) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-form-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        Back
      </button>

      <h3>{isEditMode ? "Edit Book" : "Create New Book"}</h3>

      <form onSubmit={handleSubmit} noValidate>
        {error && <p className="error">{error}</p>}

        <label>Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Author*</label>
        <input
          type="text"
          name="author"
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
          value={formData.genre}
          onChange={handleChange}
        />
        {errors.genre && <p className="error">{errors.genre}</p>}

        <label>
          {isEditMode ? "Replace Cover Image" : "Cover Image*"}
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
        />
        {errors.coverImage && (
          <p className="error">{errors.coverImage}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
            ? "Update Book"
            : "Add Book"}
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
