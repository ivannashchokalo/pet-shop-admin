import { useLocation, useNavigate, useParams } from "react-router";
import clsx from "clsx";
import styles from "./AnimalDetails.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Icon from "../../components/Icon/Icon";
import Modal from "../../components/Modal/Modal";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  useDeleteAnimalMutation,
  useGetAnimalByIdQuery,
  useUpdateAnimalMutation,
} from "../../services/animalsApi";
import { DEFAULT_PET } from "../../constants/images";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Slider from "../../components/Swiper/Swiper";
import AnimalStatusSelect from "../../components/AnimalStatusSelect/AnimalStatusSelect";

export default function AnimalDetails() {
  const { id = "" } = useParams(); // id = ""  ?????????
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const location = useLocation();

  const { data, isLoading, isError } = useGetAnimalByIdQuery(id);
  const [deleteAnimal] = useDeleteAnimalMutation();
  const [updateAnimal] = useUpdateAnimalMutation();

  const handleDelete = async () => {
    if (!id) return; // useParams() може повернути undefined, тому перевіряємо id перед запитом

    try {
      toast.loading("Deleting...");
      await deleteAnimal(id).unwrap();

      toast.dismiss();
      toast.success("Deleted");

      navigate("/animals");
    } catch {
      toast.dismiss();
      toast.error("Error");
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!id) return;

    try {
      toast.loading("Updating...");

      const formData = new FormData();

      formData.append("status", status);

      await updateAnimal({
        id,
        formData,
      }).unwrap();

      toast.dismiss();
      toast.success("Updated");
    } catch {
      toast.dismiss();
      toast.error("Error");
    }
  };

  return (
    <Section>
      <Toaster />
      <Container>
        <div className={styles.btnsWrapper}>
          <Breadcrumbs
            items={[
              { title: "Animals", path: location.state?.from || "/animals" },
              { title: "Animal details" },
            ]}
          />
          <div className={styles.changeBtnWrapper}>
            <AnimalStatusSelect
              value={data?.status || ""}
              onChange={handleUpdateStatus}
            />

            <button
              aria-label="Edit animal"
              className={styles.editBtn}
              onClick={() =>
                navigate("edit", {
                  state: { from: location.state?.from || "/animals" },
                })
              }
            >
              <Icon name="edit" size={16} className={styles.editIcon} />
              Edit
            </button>
          </div>
        </div>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data && (
          <div className={styles.detailsWrapper}>
            <div className={styles.leftColumn}>
              {data.images.length > 1 ? (
                <Slider images={data.images} />
              ) : (
                <div className={styles.animalImgWrapper}>
                  <img
                    className={styles.animalImg}
                    src={data.images[0] || DEFAULT_PET}
                    alt={data.name}
                  />
                </div>
              )}
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.contentWrapper}>
                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Name:</p>
                  <h2 className={styles.desText}>{data.name}</h2>
                </div>

                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Type:</p>
                  <p className={styles.desText}>{data.type}</p>
                </div>

                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Breed:</p>
                  <p className={styles.desText}>{data.breed}</p>
                </div>
                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Sex:</p>
                  <p className={styles.desText}>
                    {data.sex?.charAt(0).toUpperCase() + data.sex?.slice(1)}
                  </p>
                </div>

                {data.birthDate && (
                  <div
                    className={clsx(styles.flexWrapper, styles.bigGapWrapper)}
                  >
                    <p className={styles.desTitle}>Date of Birth:</p>
                    <p className={styles.desText}>
                      {new Date(data?.birthDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className={clsx(styles.flexWrapper, styles.bigGapWrapper)}>
                  <p className={styles.desTitle}>Status:</p>
                  <span className={clsx(styles.badge, styles[data.status])}>
                    {data.status?.charAt(0).toUpperCase() +
                      data.status?.slice(1)}
                  </span>
                </div>
                {data.price && (
                  <div
                    className={clsx(styles.flexWrapper, styles.bigGapWrapper)}
                  >
                    <p className={styles.desTitle}>Price:</p>
                    <p className={styles.desPrice}>{data.price}$</p>
                  </div>
                )}
              </div>

              <p className={clsx(styles.desTitle, styles.desPos)}>
                Description:
              </p>
              <p className={clsx(styles.desText, styles.desBorder)}>
                {data.description}
              </p>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={() => setIsConfirmOpen(true)}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {isConfirmOpen && (
          <Modal onModalClose={() => setIsConfirmOpen(false)}>
            <Icon name="warning" size={40} className={styles.modalIcon} />
            <h2 className={styles.modalTitle}>Delete card</h2>
            <p className={styles.modalText}>
              Are you sure you want to delete this card?
            </p>
            <div className={styles.modalBtnsWrapper}>
              <button
                className={clsx(styles.modalBtn, styles.modalBtnCancel)}
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className={clsx(styles.modalBtn, styles.modalBtnDelete)}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </Container>
    </Section>
  );
}
