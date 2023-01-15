import { AppShell, Center, Card, Text, Button, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Header } from "../components";
import { useRouter } from 'next/router';
import { useForm } from "@mantine/form"
import { useLogin } from "../services/auth/useLogin"


function Login() {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const { login } = useLogin()
    const router = useRouter();

    const form = useForm({
        initialValues: {
          email: '',
          password: '',
        },
        validate: {
            email: (value) => {(emailRegex.test(value) ? null : 'Invalid email')},
            password: (value) => (value.length >= 8 ? null : 'Invalid password'),
        },
    })
    const attemptLogin = async (values) => {
        try {
            const resp = await login(values);
            if (resp.status === 200) {
                router.push("/blogs")
            }
        } catch (err){
            if (err.request.status === 401) {
                showNotification({
                    title: 'Login Failed',
                    message: 'Sorry, the login information you have entered is incorrect. Please check your email and password and try again.',
                    color: 'yellow',
                    background: "dark"
                })
            } else {
                showNotification({
                    title: 'Oops',
                    message: 'Something went wrong. Our team is notified and working on a solution. Please try again later.',
                    color: 'red',
                })
            }

        }
    }

    return (
        <AppShell header={<Header/>}>
            <Center style={{height: "90vh"}}>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{width: 450}}>
                    <Text weight={600} mb="lg" fz="xl">Login to your account</Text>
                    <form onSubmit={form.onSubmit(attemptLogin)}>
                        <TextInput
                            placeholder="Your email"
                            label="Email"
                            mb="md"
                            type="email"
                            withAsterisk
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            placeholder="Your password"
                            label="Password"
                            mb="xl"
                            type="password"
                            withAsterisk
                            {...form.getInputProps('password')}
                        />
                        <Button type="submit" variant="light" color="blue" fullWidth mt="md" radius="md">
                            Login
                        </Button>
                    </form>
                </Card>
            </Center>
        </AppShell>
    );
}

export default Login;