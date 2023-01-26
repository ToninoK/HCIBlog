import {
  Center,
  Loader,
  Divider,
  Grid,
  TextInput,
  Button,
  MultiSelect,
  Flex,
  Text,
  MediaQuery
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import SubScript from "@tiptap/extension-subscript";
import usePosts from "../../services/posts/usePosts";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { showNotification, hideNotification } from "@mantine/notifications";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("python", python);
lowlight.registerLanguage("c", c);
lowlight.registerLanguage("cpp", cpp);

function PostForm({ id, submitHandler }) {
  const {
    post,
    getPost,
    deletePost,
    deletingPost,
    postLoading,
    creatingPost,
    updatingPost,
    postCreateError,
    postUpdateError,
    postDeleteError,
    postError,
  } = usePosts();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    label: "Your post",
  });
  const form = useForm({
    initialValues: {
      title: "",
      summary: "",
      full: "",
      tags: selectedTags,
    },
  });
  const postId = id || router.query.id;

  if (editor) {
    editor.on("update", ({ editor }) => {
      form.setFieldValue("full", editor.getHTML());
    });
  }
  useEffect(() => {
    if (postId) {
      getPost(postId);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);
  useEffect(() => {
    form.setValues({
      title: "",
      summary: "",
      full: "",
      tags: selectedTags,
    });
    setSelectedTags([]);
    if (post && postId) {
      form.setValues({
        title: post?.title || "",
        summary: post?.content?.summary || "",
        full: post?.content?.full || "",
        tags: post?.tags || [],
      });
      setSelectedTags(post?.tags || []);
      if (editor) {
        !editor.isDestroyed && editor.commands.setContent(post?.content?.full);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, editor]);

  if (postLoading) {
    return (
      <Grid.Col sm={12}>
        <Center pt="xl">
          <Loader size="lg" />
        </Center>
      </Grid.Col>
    );
  }
  if (postId && postError) {
    hideNotification("internal_error");
    showNotification({
      id: "internal_error",
      disallowClose: true,
      title: "Oops",
      message:
        "Something went wrong fetching the post. Our team is notified and working on a solution. Please try refreshing the page.",
      color: "red",
    });
  }
  if (buttonLoading && !(creatingPost || updatingPost)) {
    const notification = {
      id: "internal_error",
      disallowClose: true,
      title: "Oops",
      message: null,
      color: "red",
    };
    if (postCreateError) {
      notification.message =
        "Something went wrong creating the post. Our team is notified and working on a solution. Please try again later.";
    } else if (postUpdateError) {
      notification.message =
        "Something went wrong updating the post. Our team is notified and working on a solution. Please try again later.";
    } else {
      router.push("/blogs");
    }
    if (notification.message) {
      hideNotification("internal_error");
      showNotification(notification);
    }
  }

  if (deleteLoading && deletingPost) {
    if (postDeleteError) {
      hideNotification("internal_error");
      showNotification({
        id: "internal_error",
        disallowClose: true,
        title: "Oops",
        message:
          "Something went wrong deleting the post. Our team is notified and working on a solution. Please try again later.",
        color: "red",
      });
    } else {
      router.push("/blogs");
    }
  }

  const handleSubmit = (data) => {
    setButtonLoading(true);
    const payload = {
      title: data.title,
      content: {
        summary: data.summary,
        full: data.full,
      },
      tags: data.tags,
    };
    submitHandler(payload);
  };

  const openModal = () => {
    return openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">Are you sure you want to delete this post?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => null,
      onConfirm: handleDelete,
      confirmProps: {
        variant: "light",
        color: "red",
      },
    });
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deletePost(postId);
  };

  return (
    <Grid.Col>
      <Flex justify="center">
        <MediaQuery smallerThan="sm" styles={{width: "100%"}}>
          <form onSubmit={form.onSubmit(handleSubmit)} width={"75%"}>
            <TextInput
              placeholder="Your awesome title"
              label="Title"
              mb="md"
              type="text"
              withAsterisk
              {...form.getInputProps("title")}
            />
            <TextInput
              placeholder="This should summarize the main idea of your blog in a couple of sentences"
              label="Summary"
              mb="md"
              type="text"
              withAsterisk
              {...form.getInputProps("summary")}
            />
            <MultiSelect
              label="Tags"
              data={selectedTags}
              placeholder="Mark your post with relevant tags"
              creatable
              mb="lg"
              searchable
              rightSection={<></>}
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setSelectedTags((current) => [...current, item]);
                return item;
              }}
              {...form.getInputProps("tags")}
            />
            <Divider
              mt="xl"
              labelPosition="center"
              label={
                <h3>
                  Your post
                  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                </h3>
              }
            />
            <RichTextEditor editor={editor} mb="lg">
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                  <RichTextEditor.CodeBlock />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content {...form.getInputProps("content")} style={{height: "400px", overflowY: "auto"}}/>
            </RichTextEditor>
            <Flex justify="space-between">
              <Button
                loading={buttonLoading}
                onClick={(e) => handleSubmit}
                type="submit"
                variant="light"
                color="blue"
                mt="md"
                radius="md"
              >
                Submit
              </Button>
              {postId ? (
                <Button
                  loading={deleteLoading}
                  onClick={openModal}
                  variant="light"
                  color="red"
                  mt="md"
                  radius="md"
                >
                  Delete
                </Button>
              ) : null}
            </Flex>
          </form>
        </MediaQuery>
      </Flex>
    </Grid.Col>
  );
}

export default PostForm;
