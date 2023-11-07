import { ImagePlaceholder } from 'entities/image-placeholder';
import { SkeletonProps } from './model/types';

export const Skeleton = ({ children, enabled }: SkeletonProps) => {
  return enabled ? <ImagePlaceholder /> : children;
};
