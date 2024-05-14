const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "adrian", password: "adrian123" },
  { username: "JulieArsenault", password: "julie" },
];

export const checkCredentials = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};
