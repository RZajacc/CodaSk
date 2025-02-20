import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'email'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials, req) {
        const {email, password} = credentials!;

        const urlencoded = new URLSearchParams();
        urlencoded.append('email', email);
        urlencoded.append('password', password);

        const requestOptions = {
          method: 'POST',
          body: urlencoded,
        };

        const res = await fetch(
          'http://localhost:5008/api/users/login',
          requestOptions
        );

        const responseData = await res.json();

        const user = responseData.user;

        console.log('MY user object', user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user._id,
            email: user.email,
            name: user.first_name || '',
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/user/login',
  },
  callbacks: {
    async session({session, token, user}) {
      // Assign user id which is stored in token sub
      if (session.user && token.sub) {
        session.user._id = token.sub;
      }
      return session;
    },
  },
});

export {handler as GET, handler as POST};
