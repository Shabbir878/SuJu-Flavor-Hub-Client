import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  title: string;
  children: ReactNode;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
}

export default function FXModal({
  buttonText,
  children,
  title,
  buttonClassName,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <button className={buttonClassName} onClick={onOpen}>
        {buttonText}
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   useDisclosure,
// } from "@nextui-org/modal";
// import { ReactNode } from "react";

// interface IProps {
//   buttonText: string;
//   title: string;
//   children: ReactNode;
//   buttonVariant?:
//     | "light"
//     | "solid"
//     | "bordered"
//     | "flat"
//     | "faded"
//     | "shadow"
//     | "ghost"
//     | undefined;
//   buttonClassName?: string;
//   onClose: () => void; // Add the onClose prop to the interface
// }

// export default function FXModal({
//   buttonText,
//   children,
//   title,
//   buttonClassName,
//   onClose, // Destructure the onClose prop
// }: IProps) {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   return (
//     <div>
//       <button className={buttonClassName} onClick={onOpen}>
//         {buttonText}
//       </button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {() => (
//             // Modify this to use a proper function for rendering
//             <div>
//               <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
//               <ModalBody>{children}</ModalBody>
//               {/* Call the onClose function when the modal is closed */}
//               {/* <button
//                 className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
//                 onClick={onClose}
//               >
//                 Close
//               </button> */}
//             </div>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
