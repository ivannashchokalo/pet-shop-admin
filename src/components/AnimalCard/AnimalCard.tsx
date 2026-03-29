import clsx from "clsx";
import type { Animal } from "../../types/animal";
import styles from "./AnimalCard.module.scss";
import { Link, useLocation } from "react-router";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  const location = useLocation();
  return (
    <li className={styles.animalCard}>
      <Link to={`/animals/${animal._id}`} state={{ from: location }}>
        <div className={styles.animalImgWrapper}>
          <img
            // src={animal.images[0]}
            src="https://picsum.photos/id/237/200/300"
            alt={animal.name}
            width={300}
          />
        </div>
        <div className={styles.animalCardContent}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.animalName}>{animal.name}</h2>
            <p className={styles.animalPrice}>
              {animal.price && `$${animal.price}`}
            </p>
          </div>

          <p className={styles.animalBreed}>{animal.breed}</p>
          <p className={styles.animalSex}>
            {animal.sex
              ? animal.sex.charAt(0).toUpperCase() + animal.sex.slice(1)
              : ""}
          </p>
          <p className={clsx(styles.badge, styles[animal.status])}>
            {animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
          </p>
        </div>
      </Link>
    </li>
  );
}
