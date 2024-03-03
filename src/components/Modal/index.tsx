import { ReactNode } from 'react';
import Modal from 'react-modal';

type Props = {
    titulo: string;
    isOpen: boolean;
    closeModal: (open: boolean) => void
    children?: ReactNode;
}

export default function MyModal({ titulo, isOpen, closeModal, children }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => closeModal(false)}
            overlayClassName="bg-gray-500/50 w-screen h-screen absolute top-0 grid place-items-center"
            className="w-1/2 max-h-96 bg-white p-4 items-center rounded-lg"
        >
            <h1 className='font-bold text-xl border-b-2 pb-2 mb-2 border-gray-400 text-gray-700'>{titulo}</h1>

            <div>
                {children}
            </div>
        </Modal>
    )
}
