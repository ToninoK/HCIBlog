import { AppShell, Center, Card, Text, Button, TextInput } from '@mantine/core';
import { Header } from "../components";


function Login() {
    return (
        <AppShell header={<Header/>}>
            <Center style={{height: "90vh"}}>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{width: 450}}>
                    <Text weight={600} mb="lg" fz="xl">Login to your account</Text>
                    <TextInput
                        placeholder="Your email"
                        label="Email"
                        mb="md"
                        withAsterisk
                    />
                    <TextInput
                        placeholder="Your password"
                        label="Password"
                        mb="xl"
                        withAsterisk
                    />
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        Login
                    </Button>
                </Card>
            </Center>
        </AppShell>
    );
}

export default Login;