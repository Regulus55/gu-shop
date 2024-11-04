import { AuthImageContainer } from "components/ui";

const NotFound = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "#F8FAFC" }}
    >
      <AuthImageContainer
        image={"/images/chpassword.webp"}
        firstText="Page not found"
        secondText="Please go back to the previous page"
        width={500}
        height={500}
      />
    </div>
  );
};

export default NotFound;
