interface User {
  name: string
}

interface Chat {
  isGroupChat: boolean;
  chatName: string;
  users: User[]
}

export const getChatName = (chat: Chat) => {
  const { isGroupChat, chatName, users } = chat;
  return isGroupChat ? chatName : users[1].name;
};
