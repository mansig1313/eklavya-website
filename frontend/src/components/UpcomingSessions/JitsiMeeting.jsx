// src/components/JitsiMeeting.js
import React, { useEffect, useRef } from 'react';

const JitsiMeeting = ({ roomName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: roomName || 'test-room-123', // Default room name for testing
        width: '100%',
        height: '120%',
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          filmStripOnly: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose(); // Cleanup the Jitsi API when the component unmounts
      };
    }
  }, [roomName]);

  return <div ref={jitsiContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default JitsiMeeting;
