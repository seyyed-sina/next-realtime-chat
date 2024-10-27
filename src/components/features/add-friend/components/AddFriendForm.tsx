'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { mutateData } from '@adapter';
import { FormField, FormValidation, SubmitButton } from '@components';
import { apiEndpoints } from '@constants';

import { AddFriendFormProps } from '../add.types';
import { addFriendSchema } from '../add.validator';

export const AddFriendForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddFriendFormProps>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      email: '',
    },
  });

  const submitData = async (email: AddFriendFormProps) => {
    const validEmail = addFriendSchema.parse(email);

    try {
      const res = await mutateData<number>(apiEndpoints.ADD_FRIEND, {
        body: JSON.stringify(validEmail),
      });

      if (res.error) {
        throw new Error(res.message);
      }

      toast.success('Friend request sent');
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        toast.error(error.message);
      }
      console.log('error: ', error);
    }
  };

  const onSubmit: SubmitHandler<AddFriendFormProps> = async (data) => {
    await submitData(data);
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-2 max-w-md"
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
      <SubmitButton label="Add" isSubmitting={isSubmitting} />
    </form>
  );
};

AddFriendForm.displayName = 'AddFriendForm';
