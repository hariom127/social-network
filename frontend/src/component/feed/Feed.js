import { useState, useEffect } from "react";
import "./feed.css";
import Share from "../../component/share/Share";
import Post from "../../component/post/Post";
import axios from "../../helper/axios";
export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // const res = axios.get("/posts/timeline/all");
    // console.log(res);
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
}
