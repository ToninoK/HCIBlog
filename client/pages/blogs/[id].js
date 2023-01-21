import { Grid } from "@mantine/core"
import { useRouter } from "next/router";
import PostForm from "../../components/PostForm";

import usePosts from "../../services/posts/usePosts";


function UpdatePost() {
  const { updatePost } = usePosts();
  const router = useRouter();
  const postId = router.query.id;


  const handleUpdate = (data) => {
    return updatePost(postId, data)
  }

  return (
    <Grid>
        {<PostForm postId={postId} submitHandler={handleUpdate}/>}
    </Grid>
    )
  };
  
  export default UpdatePost;
  