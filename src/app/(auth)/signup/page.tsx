import SignUpForm from "@/components/widgets/SignUpForm";
import { Theme } from "@radix-ui/themes";

const page = () => {
  return (
    <div className="w-1/2 mt-24 flex justify-center">
      <Theme>
      <SignUpForm />
      </Theme>
      
    </div>
  );
};

export default page;
