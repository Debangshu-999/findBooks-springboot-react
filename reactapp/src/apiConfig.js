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


export const addBook = async(book) => {
    
}