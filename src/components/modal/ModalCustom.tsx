import Modal from 'react-modal';

const customStyles = {
   content: {
      maxWidth: '1400px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};
interface ModalCustomType {
   openModal: boolean
   setOpenModal: (value: boolean) => void
   children?: React.ReactNode
}
const ModalCustom: React.FC<ModalCustomType> = ({ openModal, setOpenModal, children }) => {
   return (
      <>
         <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            style={customStyles}
            contentLabel="Modal"
         >{children}</Modal>
      </>
   )
}

export default ModalCustom