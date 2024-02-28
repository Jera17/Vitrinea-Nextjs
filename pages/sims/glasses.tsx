import React, { useEffect, useState } from 'react';
import getCameraProperties from './glasses.js';

const Glasses: React.FC = () => {
  const [cameraProperties, setCameraProperties] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const properties = await getCameraProperties(cameraProperties);
      setCameraProperties(properties);
    };

    fetchData();
  }, []);

  return (
    <div>
      {cameraProperties ? (
        <div>
          <p>Width: {cameraProperties.width}</p>
          <p>Height: {cameraProperties.height}</p>
        </div>
      ) : (
        <p>Loading camera properties...</p>
      )}
    </div>
  );
};

export default Glasses;
