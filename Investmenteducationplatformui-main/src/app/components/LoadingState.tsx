import { motion } from 'motion/react';

interface LoadingStateProps {
  type?: 'card' | 'stat' | 'text' | 'circle';
  count?: number;
}

export function LoadingState({ type = 'card', count = 1 }: LoadingStateProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'stat':
        return (
          <div className="border border-blue-900/20 p-6 space-y-3">
            <div className="skeleton h-8 w-8 rounded-full" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-6 w-16" />
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
          </div>
        );
      
      case 'circle':
        return (
          <div className="skeleton w-16 h-16 rounded-full" />
        );
      
      case 'card':
      default:
        return (
          <div className="border border-blue-900/20 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="skeleton w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-6 w-32" />
                <div className="skeleton h-4 w-48" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-4/6" />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
}