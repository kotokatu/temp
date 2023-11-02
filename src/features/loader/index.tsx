import { ReactNode } from 'react';
import { ImagePlaceholder } from 'entities/image-placeholder';

type LoaderProps = {
  enabled: boolean;
  children: ReactNode;
};

export const Loader = ({ children, enabled }: LoaderProps) => {
  return enabled ? <ImagePlaceholder /> : children;
};
