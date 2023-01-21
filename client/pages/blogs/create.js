import { Grid } from "@mantine/core"
import PostForm from "../../components/PostForm";

import usePosts from "../../services/posts/usePosts";


function CreatePost() {
  const { createPost } = usePosts();

  return (
    <Grid>
        {<PostForm submitHandler={createPost}/>}
    </Grid>
    )
  };
  
  export default CreatePost;
  