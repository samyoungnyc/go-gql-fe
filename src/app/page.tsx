import { AddUserButton } from './AddUserButton';

async function getData() {
  const query = `
    {
      getUsers {
        id
        name
        email
        password
      }
    }
  `;

  if (!process.env.NEXT_PUBLIC_API_ENDPOINT) {
    throw new Error('API_ENDPOINT is not defined');
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  try {
    const json = await res.json();
    return json.data.getUsers;  // GraphQL responses are often wrapped in a "data" object
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}

async function addUser() {
  const mutation = `
    mutation {
      addUser(
        name: "New User 10:55PM"
        email: "newuser@example.com"
        password: "password123"
      ) {
        id
        name
        email
      }
    }
  `;

  if (!process.env.NEXT_PUBLIC_API_ENDPOINT) {
    throw new Error('API_ENDPOINT is not defined');
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to send mutation');
  }

  try {
    const json = await res.json();
    return json.data.addUser;  // GraphQL responses are often wrapped in a "data" object
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}

interface User {
  ID: number;
  name: string;
  email: string;
  password: string;
};
 
export default async function Page() {
  const data = await getData();

  return (
    <main>
      <h1>users</h1>
      <AddUserButton />
      {data.map((user: User) => (
        <div key={user.ID}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.password}</p>
        </div>
      ))}
    </main>
  )
}
