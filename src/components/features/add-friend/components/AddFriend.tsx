import { AddFriendForm } from '@components';

export const AddFriend = () => {
  return (
    <section className="container">
      <h1>Add a friend</h1>
      <AddFriendForm />
    </section>
  );
};

AddFriend.displayName = 'AddFriend';
