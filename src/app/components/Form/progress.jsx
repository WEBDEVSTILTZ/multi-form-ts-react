import React from 'react';
import * as Progress from '@radix-ui/react-progress';

const QuoteProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let currentProgress = 0;
    const timers = [];
    for (let i = 0; i < 3; i++) {
      const timer = setTimeout(() => {
        let randomIncrement;
        if (i < 2) {
          // For the first two steps, generate a random increment between 1 and (100 - currentProgress - 1)
          randomIncrement = Math.floor(Math.random() * (100 - currentProgress - 1)) + 1;
        } else {
          // For the last step, set the increment to whatever is needed to reach 100
          randomIncrement = 100 - currentProgress;
        }
        currentProgress += randomIncrement;
        setProgress(currentProgress);
      }, i * 500); // Change progress every 500 ms
      timers.push(timer);
    }

    // Cleanup function: Clears all timers when the component unmounts
    // or before the next effect runs.
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <Progress.Root
      className="relative mt-5  overflow-hidden bg-blackA6 rounded-full w-[300px] h-[25px] bg-gray-100"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-meduimgrey w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default QuoteProgress;