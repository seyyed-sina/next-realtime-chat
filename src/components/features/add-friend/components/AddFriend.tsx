import { AddFriendForm, PageSection } from '@components';

export const AddFriend = () => {
  return (
    <PageSection title="Add a friend">
      <AddFriendForm />
    </PageSection>
  );
};

AddFriend.displayName = 'AddFriend';
