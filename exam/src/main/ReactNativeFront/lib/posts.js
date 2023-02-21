import {useState, useEffect} from 'react';
import axios from 'axios';

const posts = props => {
  const {description} = props;
  const [posts, setPost] = useState();

  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/',
      data: {
        // 인자로 보낼 데이터
        photoURL: '',
        description: description,
      },
    }).then(response => setPost(response.data));
  });
  console.log(posts);
};

export default posts;
