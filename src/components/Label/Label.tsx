import { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => {
  return <label className='text-gray-600'>{children}</label>;
};
