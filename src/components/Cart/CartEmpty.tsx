import hangerEmpty from "assets/error1.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CartEmpty() {
  const router = useRouter();

  const goHomepageHandler = () => {
    router.push("/men");
  };
  return (
    <div className="text-center">
      <div className="mb-12 mt-8">
        <Image
          src={hangerEmpty}
          alt="image 404"
          className="object-cover"
          height={260}
          priority
        />
      </div>
      <h2 className="text-3xl text-gray-600 mb-11 font-bold">
        {`Your cart is empty :(`}
      </h2>
      <button
        onClick={goHomepageHandler}
        className="px-5 py-3 border-2 border-primary-color rounded-sm text-black bg-[ #6F42C1  ] transition"
      >
        Go Back to home page
      </button>
    </div>
  );
}
