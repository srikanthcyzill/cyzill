import { AiOutlineClose } from 'react-icons/ai';

export const MediaItem = ({ file, index, removeFile }) => {
    return (
        <div key={index} className="mb-2 relative">
            {file.type === 'images' ? (
                <img src={file.url} alt={`Image ${index}`} className="w-full h-32 object-cover" />
            ) : (
                <video src={file.url} alt={`Video ${index}`} className="w-full h-32 object-cover" controls />
            )}
            <AiOutlineClose
                className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600"
                onClick={() => removeFile(index)}
            />
        </div>
    );
};
