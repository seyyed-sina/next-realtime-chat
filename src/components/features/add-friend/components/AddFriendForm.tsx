'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormField, FormValidation, SubmitButton } from '@components';
import { apiEndpoints } from '@constants';

import { AddFriendFormProps } from '../add.types';
import { addFriendSchema } from '../add.validator';

export const AddFriendForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFriendFormProps>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      email: '',
    },
  });

  const submitData = async (email: string) => {
    console.log('email: ', email);
    const validEmail = addFriendSchema.parse({ email });
    console.log('validEmail: ', validEmail);

    try {
      const res = await fetch(apiEndpoints.ADD_FRIEND, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(validEmail),
      });

      const data = await res.json();
      console.log('data: ', data);

      toast.success('Friend request sent');
    } catch (error) {
      console.log('error: ', error);
      if (error instanceof z.ZodError) {
        return;
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const onSubmit: SubmitHandler<AddFriendFormProps> = async (data) => {
    console.log('data: ', data);
    await submitData(data.email);
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Add friend by email:" inputId="email" required>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="inputbox"
          placeholder="Enter email address"
        />
        <FormValidation message={errors.email?.message} />
      </FormField>
      <SubmitButton label="Add" />
    </form>
  );
};

AddFriendForm.displayName = 'AddFriendForm';
