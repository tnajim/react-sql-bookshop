import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/books/" + id, book);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" value={book.title || ""} />
      <input type="text" placeholder="desc" onChange={handleChange} name="desc" value={book.desc || ""} />
      <input type="number" placeholder="price" onChange={handleChange} name="price" value={book.price || ""} />
      <input type="text" placeholder="cover" onChange={handleChange} name="cover" value={book.cover || ""} />

      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update