import { Video } from "expo-av";
import React, { ComponentProps, forwardRef } from "react";

interface VideoProps extends ComponentProps<typeof Video> {}

export default forwardRef<Video, VideoProps>(function MyVideo(
  { ...props },
  ref
) {
  return <Video ref={ref} {...props} />;
});
