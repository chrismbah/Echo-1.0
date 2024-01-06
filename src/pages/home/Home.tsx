import { getDocs, collection } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useState, useEffect } from "react";
import { IPost } from "../../interface/interfaces";
import Post from "./Post";
import Spinner from "../../components/Spinner";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function Home() {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(database, "posts"); // Gets the data from the database called "posts"
  const [loading, setLoading] = useState(true);
  const [imageUpload, setImageUpload] = useState<any | null>(null);
  const [imageList, setImageList] = useState<any>([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev: any) => [...prev, url]);
      });
      alert("Image Uploaded");
      console.log("Image Uploaded");
    });
  };
  // const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef);
      const list = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IPost[];
      setPostsList(list);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // setError("true");
    }
  };

  useEffect(() => {
    getPosts();
    listAll(imageListRef).then((res) => {
      console.log(res);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
    // console.log(process.env)
  }, []);

  return (
    <div className="section">
      <h2 className="heading2">File Upload</h2>
      <div className="blue-line mb-4" />
      <div>
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files && e.target.files[0])}
          className=""
        />
        <button onClick={uploadImage} className="auth-btn">
          Upload Image
        </button>
        {imageList.map((url: string) => {
          return (
            <img
              src={url}
              alt="image"
              className="w-[100px] h-[100px] rounded-full  "
            />
          );
        })}
      </div>
      <div className="header mb-4">
        <h1 className="heading1">Home</h1>
        <div className="blue-line" />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-[65vh]">
          <Spinner />
        </div>
      ) : (
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {postsList?.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
