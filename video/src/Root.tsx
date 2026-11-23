import React from 'react';
import { Composition, Still } from 'remotion';
import { Video } from './Video';
import { Thumb } from './thumb';
import { FPS, T } from './theme';
import { TOTAL } from './data';
export const Root: React.FC = () => (
  <>
    <Composition id="StoryVideo" component={Video} durationInFrames={T(TOTAL)} fps={FPS} width={1920} height={1080} />
    <Still id="Thumbnail" component={Thumb} width={1280} height={720} />
  </>
);
