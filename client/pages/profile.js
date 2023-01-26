import { Grid, Center, Loader, Image, TextInput, Button, Flex, FileButton} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import SubScript from "@tiptap/extension-subscript";

import useUser from "../services/users/useUser"
import { showNotification, hideNotification } from "@mantine/notifications";


const Profile = () => {
    const {user, userLoading, getUser, updateUser, updatingUser, updateUserError} = useUser();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [fileb64, setFileb64] = useState(null)

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: "",
      label: "Your post",
      maxHeight: "400px"
    });
    const form = useForm({
      initialValues: {
        title: "",
        description: "",
      },
    });

    useEffect(()=>{
      getUser("nickarmie@gmail.com")
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (updatingUser) {
        return
      }
      setButtonLoading(false);
      if (updateUserError) {
        hideNotification("internal_error");
        showNotification({
          id: "internal_error",
          disallowClose: true,
          title: "Oops",
          message:
            "Something went wrong updating your info. Our team is notified and working on a solution. Please try again later.",
          color: "red",
        });
      }
      form.setValues({
        title: "",
        description: "",
      });
      if (user) {
        form.setValues({
          title: user?.title || "",
          description: user?.description || "",
        });
        if (editor && !editor.isDestroyed) {
          editor.commands.setContent(user?.description);
        }
      }
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, editor]);

    const getBase64 = (inpFile) => {
      const reader = new FileReader();
      reader.readAsDataURL(inpFile);
      reader.onload = () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');
        setFileb64(base64String)
      };
      reader.onerror = (error) => {
        hideNotification("internal_error");
        showNotification({
          id: "internal_error",
          disallowClose: true,
          title: "Oops",
          message:
            "Something went wrong uploading your image. Our team is notified and working on a solution. Please try again later.",
          color: "red",
        });
      };
   }
   

    const handleSubmit = (data) => {
      setButtonLoading(true);
      console.log(fileb64)
      const payload = {...data}
      if (fileb64) {
        payload.profile = fileb64
      }
      console.log(payload)
      updateUser(1, payload)
    }

    const getSrc = () => {
      if (!user?.profile) {
        return
      }
      return `data:image/png;base64, ${user?.profile}`
    }

    if (userLoading || updatingUser) {
      return (
        <Grid>
          <Grid.Col span={7}>
            <Center pt="xl">
              <Loader size="lg" />
            </Center>
          </Grid.Col>
        </Grid>
      );
    }

    return (
      <Grid>
        <Grid.Col span={7}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex justify="flex-start" direction="column" gap="md">
            <Image radius="md" alt="Profile picture" width={250} height={250} src={getSrc()} withPlaceholder />
              <Flex justify="flex-start">
                <FileButton onChange={getBase64} accept="image/png,image/jpeg">
                  {(props) => <Button variant="light" {...props}>Upload new image</Button>}
                </FileButton>
              </Flex>
              <TextInput
                placeholder="What is your title"
                label="Title"
                mb="md"
                type="text"
                withAsterisk
                {...form.getInputProps("title")}
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
                <RichTextEditor.Content {...form.getInputProps("description")} style={{height: "330px", overflowY: "auto"}}/>
              </RichTextEditor>
              <Flex justify="flex-start">
                <Button
                  loading={buttonLoading}
                  onClick={(e) => {}}
                  type="submit"
                  variant="light"
                  color="blue"
                  radius="md"
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </form>
        </Grid.Col>
      </Grid>
    );
  };
  
  export default Profile;
  