import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./feed.css";
import Share from "../../component/share/Share";
import Post from "../../component/post/Post";
import axios from "../../helper/axios";
import { post } from "../../redux/action/postAction";

export default function Feed() {
  const dispatch = useDispatch();

  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state) => state.posts);
  const allPost = posts.posts[0] ? posts.posts[0] : [];

  useEffect(() => {
    dispatch(post());
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {allPost.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
