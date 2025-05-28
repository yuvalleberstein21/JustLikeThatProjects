interface User {
    id: number;
    username: string;
    password: string;
    name: string;
  }
  
  const users: User[] = [
    { id: 1, username: "yuval", password: "1234", name: "Yuval Leberstein" },
    { id: 2, username: "dan", password: "abcd", name: "Dan Cohen" },
  ];
  
  export default users;