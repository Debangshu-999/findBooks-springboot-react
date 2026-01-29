const BASE_URL = "";

const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const getBooks_API = async () => {
  const res = await fetch(`${BASE_URL}/**`, {
    method: "GET",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message);
  }

  return await res.json();
};

export const addBook_API = async (bookData) => {
  const formData = new FormData();

  // Part 1: bookData as JSON
  formData.append(
    "bookData",
    new Blob(
      [
        JSON.stringify({
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre,
          publishedDate: bookData.publishedDate,
        }),
      ],
      { type: "application/json" },
    ),
  );

  // Part 2: cover image file
  if (bookData.coverImage) {
    formData.append("coverImage", bookData.coverImage);
  }

  const response = await fetch(`${BASE_URL}/**`, {
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to add book");
  }

  return await response.json();
};

export const getBookById_API = async (id) => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "GET",
    headers: {
      Authorization: getToken()
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to fetch book");
  }

  return await response.json();
};


export const updateBook_API = async (bookData) => {
  const formData = new FormData();

  // JSON part
  formData.append(
    "bookData",
    new Blob(
      [
        JSON.stringify({
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre,
          publishedDate: bookData.publishedDate,
        }),
      ],
      { type: "application/json" }
    )
  );

  // Image part (optional)
  if (bookData.coverImage) {
    formData.append("coverImage", bookData.coverImage);
  }

  const response = await fetch(`${BASE_URL}/books/${bookData.id}`, {
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to update book");
  }

  return await response.json();
};

