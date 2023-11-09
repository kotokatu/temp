import { StoreProvider } from 'app/store';
import { ErrorThrowingButton } from 'features/error-throwing-button';
import { FC } from 'react';
import { Outlet } from 'react-router';
import { BottomSection } from 'widgets/bottom-section';
import { TopSection } from 'widgets/top-section';
import styles from './main-page.module.css';

export const MainPage: FC = () => {
  return (
    <>
      <main className={styles.main}>
        <ErrorThrowingButton />
        <h1 hidden={true}>TV Shows App</h1>
        <StoreProvider>
          <TopSection />
          <BottomSection />
        </StoreProvider>
      </main>
      <Outlet />
    </>
  );
};
