import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'


const UserModal = ({ text, isOpen = false, setModalOpen }) => {

  useEffect(() => {
    console.log("is open " + isOpen+ isModalOpen);
    setIsModalOpen(isOpen)
  }, [isOpen])

  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setModalOpen(false)
  };

  return (
    <Modal title="User Error" open={isModalOpen} footer={null} onCancel={handleCancel} >
      <p>{text}</p>
    </Modal>
  )
}

export default UserModal
