import tw from 'tailwind-styled-components';

const Container = tw.div`
  @apply flex items-center justify-center min-h-screen bg-gray-100;
`;

const Form = tw.form`
  @apply bg-white p-6 rounded shadow-md w-42 max-w-sm;
`;

const Input = tw.input`
  @apply w-full p-2 border border-gray-300 rounded mt-10 mt-4;
`;

const Button = tw.button`
  @apply w-full p-2 bg-blue-500 text-white rounded mt-10;
`;

export default function Login() {
  return (
    <Container>
      <Form>
        <h2 className="text-center text-2xl mb-6">Shuttle driver login</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Log in</Button>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500">Register</a>
        </div>
      </Form>
    </Container>
  );
}
