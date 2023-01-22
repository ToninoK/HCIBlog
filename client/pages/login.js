import { AppShell, Center, Card, Text, Button, TextInput, PasswordInput } from '@mantine/core';
import { hideNotification, showNotification } from '@mantine/notifications';
import { Header } from "../components";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from "@mantine/form"
import { useLogin } from "../services/auth/useLogin"


function Login() {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const { login } = useLogin()
    const router = useRouter();
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        try {
            const resp = await login(values);
            console.log(resp.status)
            if (resp.status === 200) {
                console.log(resp.status)
                router.push("/blogs")
            }
        } catch (err){
            if (err.request.status === 401) {
                form.setFieldError("password", "Wrong password")
            } else {
                hideNotification("internal_error")
                showNotification({
                    id: "internal_error",
                    disallowClose: true,
                    title: 'Oops',
                    message: 'Something went wrong. Our team is notified and working on a solution. Please try again later.',
                    color: 'red',
                })
            }
            setLoading(false)
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
                            variant='filled'
                            type="email"
                            withAsterisk
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            placeholder="Your password"
                            label="Password"
                            mb="xl"
                            variant='filled'
                            withAsterisk
                            {...form.getInputProps('password')}
                        />
                        <Button type="submit" loading={loading} variant="light" color="blue" fullWidth mt="md" radius="md">
                            Login
                        </Button>
                    </form>
                </Card>
            </Center>
        </AppShell>
    );
}

export default Login;