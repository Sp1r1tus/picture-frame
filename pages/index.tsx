import * as fs from "fs/promises";
import * as path from "path";
import { useState } from "react";
import Modal from "../components/Dialog";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Virtual, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface IHomePage {
  allPhotos: string[];
}

function Home({ allPhotos }: IHomePage) {
  const [showPhotos, setShowPhotos] = useState(allPhotos);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [photoID, setPhotoID] = useState("");
  const [show, setShow] = useState(false);

  function openModal() {
    swiper?.autoplay.stop();

    setPhotoID(swiper?.slides[1].children[0].currentSrc);
    setShow(true);
  }

  function reload() {
    location.reload();
  }

  return (
    <div>
      <div className="min-h-screen flex justify-center">
        <Swiper
          onSwiper={setSwiper}
          effect={"fade"}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation, Virtual]}
          virtual
          className="mySwiper"
        >
          {showPhotos.map((slideContent, index) => (
            <SwiperSlide key={slideContent + index} virtualIndex={index}>
              <img className="min-h-screen" src={slideContent} alt="photos" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="z-50 absolute top-5 right-10 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Delete
      </button>
      <button
        className="z-50 absolute top-20 right-10 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        onClick={reload}
      >
        Reload
      </button>
      {show && (
        <Modal
          allPics={allPhotos}
          pic={photoID}
          onClose={(newShuffledPhotos: string[]) => {
            setShowPhotos(newShuffledPhotos);
            swiper?.autoplay.start();
            setShow(false);
          }}
        >
          <div className="flex justify-center h-full">
            <img className="h-full" src={photoID} alt="photos" />
          </div>
        </Modal>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const filepath = path.join(process.cwd(), "data", "fotos.json");
  const filepathDelete = path.join(process.cwd(), "data", "delete.json");
  const showData: string[] = JSON.parse(await fs.readFile(filepath, "utf8"));
  const dataDelete: string[] = JSON.parse(
    await fs.readFile(filepathDelete, "utf8")
  );
  const shuffledPix = showData
    .filter((data: string) => !dataDelete.includes(data))
    .sort(() => 0.5 - Math.random());
  return {
    props: {
      allPhotos: shuffledPix,
    },
  };
}

export default Home;
