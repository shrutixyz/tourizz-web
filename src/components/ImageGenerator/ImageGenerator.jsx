import React, { useRef } from 'react';

const ImageGenerator = () => {
  // Reference to the canvas element
  const canvasRef = useRef(null);

  // Function to generate random integer
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate random colors
  const getRandomColor = () => {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return `rgb(${r},${g},${b})`;
  };

  // Function to generate random abstract shapes
  const generateRandomImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas before drawing a new image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numberOfShapes = getRandomInt(5, 15); // Draw between 5 and 15 shapes

    for (let i = 0; i < numberOfShapes; i++) {
      const shapeType = getRandomInt(0, 2);  // Randomly choose shape: 0 = circle, 1 = rectangle

      // Random position, size, color, and rotation
      const x = getRandomInt(0, canvas.width);
      const y = getRandomInt(0, canvas.height);
      const size = getRandomInt(20, 100);
      const color = getRandomColor();
      const rotation = getRandomInt(0, 360) * (Math.PI / 180);  // Rotation in radians

      ctx.save();  // Save the current drawing context state

      // Move the context to the center of the shape, apply rotation, and draw the shape
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Draw a random shape
      if (shapeType === 0) {
        // Draw circle
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        // Draw rectangle
        ctx.beginPath();
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.fillStyle = color;
        ctx.fill();
      }

      ctx.restore();  // Restore the original drawing context state
    }
  };

  // Function to download the generated image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png'); // Get image data URL in PNG format
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'random_abstract_image.png'; // File name for download
    link.click(); // Trigger the download
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Random Abstract Image Generator</h1>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        style={{ border: '1px solid black', marginBottom: '20px' }}
      ></canvas>
      <br />
      <button onClick={generateRandomImage}>Generate Random Image</button>
      <button onClick={downloadImage} style={{ marginLeft: '10px' }}>
        Download Image
      </button>
    </div>
  );
};

export default ImageGenerator;
