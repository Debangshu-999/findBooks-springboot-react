const BASE_URL = ""

export const getBooks_API = async() => {
    const res = await fetch(`${BASE_URL}/**`, {
        method:"GET",
        headers:{
            "Authorization" : localStorage.getItem("token"),
            "Content-Type" : "application/json"
        }
        
    })

    if(!res.ok){
        const errData = await res.json()
        throw new Error(errData.message)
    }

    return await res.json()

    
}


export const addBook_API = async (bookData) => {
  const formData = new FormData();

  // Part 1: bookData as JSON
  formData.append(
    "bookData",
    new Blob([JSON.stringify({
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      publishedDate: bookData.publishedDate,
    })], { type: "application/json" })
  );

  // Part 2: cover image file
  formData.append("coverImage", bookData.coverImage);

  const response = await fetch(`${BASE_URL}/api/books`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to add book");
  }

  return await response.json();
};
