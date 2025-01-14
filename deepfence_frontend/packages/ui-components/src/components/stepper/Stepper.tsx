import { createContext, useContext } from 'react';
import { useMeasure } from 'react-use';
import { cn } from 'tailwind-preset';

type StepProps = {
  indicator: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
};

export const StepLine = ({ className }: { className?: string }) => {
  const { contentHeight, indicatorHeight } = useContext(StepHeightContext);
  return (
    <div
      className={cn('absolute border-l left-[50%] dark:border-df-gray-600', className)}
      style={{
        top: indicatorHeight + 2,
        height: contentHeight - indicatorHeight - 4,
      }}
    ></div>
  );
};

export const StepIndicator = ({
  children,
  className,
  rounded = true,
}: {
  children: React.ReactNode;
  className?: string;
  rounded?: boolean;
}) => {
  const [measureRef, { height }] = useMeasure<HTMLDivElement>();
  const { contentHeight } = useContext(StepHeightContext);
  return (
    <StepHeightContext.Provider
      value={{
        contentHeight: contentHeight,
        indicatorHeight: height,
      }}
    >
      <div
        className={cn(
          'flex items-center justify-center relative dark:bg-transparent dark:text-text-text-and-icon text-h4',
          className,
        )}
        ref={measureRef}
      >
        <div className="overflow-hidden">
          <div
            className={cn('dark:bg-bg-card', {
              'rounded-full': rounded,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </StepHeightContext.Provider>
  );
};

export const Step = ({ indicator, title, children }: StepProps) => {
  const [measureRef, { height }] = useMeasure<HTMLDivElement>();
  return (
    <StepHeightContext.Provider
      value={{
        contentHeight: height,
        indicatorHeight: 0,
      }}
    >
      <div className="flex">
        <div className="flex flex-col">{indicator}</div>
        <div ref={measureRef} className="w-full">
          <h4 className="ml-4 relative mx-0 text-h4 dark:text-text-text-and-icon">
            {title}
          </h4>
          <div className="ml-4 mb-6">{children}</div>
        </div>
      </div>
    </StepHeightContext.Provider>
  );
};
type StepperProps = {
  children: React.ReactNode;
};

const StepHeightContext = createContext<{
  contentHeight: number;
  indicatorHeight: number;
}>({
  contentHeight: 0,
  indicatorHeight: 0,
});

export const Stepper = ({ children }: StepperProps) => {
  return <div className="relative">{children}</div>;
};
