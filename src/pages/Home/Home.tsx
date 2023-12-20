import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Home = () => {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <PageWrapper>
        <div className='flex h-full bg-sl-logo bg-contain bg-no-repeat w-full bg-center bg-slate-900' />
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
