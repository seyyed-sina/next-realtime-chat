'use server';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { mutateData } from '@adapter';
import { apiEndpoints, routes } from '@constants';

export const acceptAction = async (id: string) => {
  const session = await auth();
  console.log('session in action: ', session);
  if (!session) {
    redirect(routes.SIGN_IN);
  }
  await mutateData(apiEndpoints.ACCEPT_FRIEND, {
    body: JSON.stringify({ id }),
  });
};

export const rejectAction = async (id: string) => {
  const session = await auth();
  console.log('session in action: ', session);
  if (!session) {
    redirect(routes.SIGN_IN);
  }

  await mutateData(apiEndpoints.DECLINE_FRIEND, {
    body: JSON.stringify({ id }),
  });
};
