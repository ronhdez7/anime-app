import { Video } from "expo-av";
import React, { ComponentProps, forwardRef } from "react";

interface PlayerProps extends ComponentProps<typeof Video> {}

export default forwardRef<Video, PlayerProps>(function Player(
  { ...props },
  ref
) {
  return <Video ref={ref} {...props} />;
});
