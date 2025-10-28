interface SpinnerProps {
    size?: 'full' | 'inline'; // full-page vs inline
    message?: string;         // optional text for full spinner
}
  
const Spinner = ({ size = 'full', message }: SpinnerProps) => {
    const isFull = size === 'full';

    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex ${isFull ? 'flex-col py-20' : 'justify-center py-4'} items-center text-center text-gray-700`}
        >
            <div
                className={`${isFull ? 'w-12 h-12 mb-4' : 'w-6 h-6'} border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin`}
                aria-hidden="true"
            ></div>
            {isFull && message && <span className="text-lg font-medium">{message}</span>}
        </div>
    );
};

export default Spinner;
  