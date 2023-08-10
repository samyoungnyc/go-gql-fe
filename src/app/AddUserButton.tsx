'use client'

export const AddUserButton = () => {
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
  const handleAddUser = async () => {
      try {
        await addUser();
        console.log('called handleAddUser()')
      } catch (err) {
        console.error(err);
      }
  };

  return (
      <button onClick={handleAddUser}>Add User</button>
  )
}