import { ReactNode } from 'react';
import * as ReactModal from 'react-modal';

type Props = {
    titulo: string;
    isOpen: boolean;
    closeModal: (open: boolean) => void
    notCloseOnClickOverlay?: boolean;
    children?: ReactNode;
}

export default function ModalLateral({ titulo, isOpen, closeModal, notCloseOnClickOverlay, children }: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => closeModal(false)}
            shouldCloseOnOverlayClick={!notCloseOnClickOverlay}
            overlayClassName={`w-screen h-screen absolute top-0 ${notCloseOnClickOverlay && "w-96 right-0"} bg-gray-500/50 flex justify-end`}
            className="w-96 h-full max-h-screen overflow-auto bg-white p-4 items-center"
        >
            <h1 className='font-bold text-xl border-b-2 pb-2 mb-2 border-gray-400 text-gray-700'>{titulo}</h1>

            <div>
                {children}
            </div>
        </ReactModal>
    )
}
