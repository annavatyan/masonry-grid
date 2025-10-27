import { Link } from "react-router-dom";
import type { Photo } from "../../utils/types";

const PhotoCard = ({photo}: {photo: Photo}) => {
    return (
        <Link to={`/photo/${photo.id}`} state={{ photo }}>
            <img
                src={photo.src.medium}
                alt={photo.alt}
                className="rounded-lg shadow-sm w-full transition hover:opacity-90"
                loading="lazy"
            />
        </Link>
    );
}

export default PhotoCard;