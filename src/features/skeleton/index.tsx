import { ImagePlaceholder } from 'entities/image-placeholder';
import { FC } from 'react';
import { SkeletonProps } from './model/skeleton-props.type';
export const Skeleton: FC<SkeletonProps> = ({ children, enabled }) => {
  return enabled ? <ImagePlaceholder /> : children;
};
