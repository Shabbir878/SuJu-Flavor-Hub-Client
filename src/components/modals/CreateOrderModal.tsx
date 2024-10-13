"use client";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";

import FXModal from "./FXModal";

import { useCreateOrderMutation } from "@/src/redux/features/order/order";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";

interface CreateOrderModalProps {
  totalPrice: number;
  totalMonth: number;
  isOpen: boolean;
  onClose: () => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  totalPrice,
  totalMonth,
  isOpen,
}) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: userData } = useGetMyDataQuery(undefined);
  const user = userData?.data[0];

  // Correctly typed onSubmit function
  const onSubmit = async (data: any, { reset }: { reset: () => void }) => {
    const finalData = {
      user: { name: user?.name, email: user?.email, id: user?._id },
      totalPrice,
    };
    const res = await createOrder(finalData).unwrap();

    if (res.success) {
      window.location.href = res.data.payment_url;
      reset(); // Reset form after successful submission
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        buttonClassName="flex"
        buttonText="Buy"
        title="Update Your Profile"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              defaultValue={user?.name}
              isDisabled={true}
              label="Name"
              name="name"
            />
          </div>
          <div className="py-1">
            <FXInput
              isDisabled
              defaultValue={user?.email}
              label="Email"
              name="email"
            />
          </div>
          <div className="py-1">
            <FXInput
              isDisabled
              defaultValue={totalPrice}
              label="Total Amount"
              name="totalPrice"
            />
          </div>
          <div className="py-1">
            <FXInput
              isDisabled
              defaultValue={totalMonth}
              label="Total Month"
              name="totalMonth"
            />
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              {isLoading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default CreateOrderModal;
