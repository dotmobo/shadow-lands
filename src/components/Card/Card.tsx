import type { PropsWithChildren } from 'react';
import { WithClassnameType } from 'types';

interface CardType extends PropsWithChildren, WithClassnameType {
  title: string;
  description?: string;
}

export const Card = (props: CardType) => {
  const { title, children, description } = props;

  return (
    <div
      className='flex flex-col flex-1 rounded-xl bg-white p-3 justify-center'
      data-testid={props['data-testid']}
    >
      <h2 className='flex text-xl font-medium group'>{title}</h2>
      {description && <p className='text-gray-500 mb-2'>{description}</p>}
      {children}
    </div>
  );
};
