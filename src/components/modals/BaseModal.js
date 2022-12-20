/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import colors from '../../styles/colors';
import LogoutModal from './LogoutModal';
import Icon from '../Icon';
import { IconEnum as Icons } from '../Icons';
import DeleteConfirmModal from '../templates/DeleteConfirmModal';

const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: '5px',
    width: 'auto',
    height: 'auto',
    maxHeight: '90vh',
};

const Title = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${colors.grey1};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid ${colors.grey6};
`;

export const ModalList = Object.freeze({
    LogoutModal: 'Sign Out',
    DeleteCampaignModal: 'Delete Confirmation',
});

export default function BaseModal({
    open, modalType, onClose, ...rest
}) {
    const renderModal = (modalType, close) => {
        switch (modalType) {
            case ModalList.LogoutModal:
                return <LogoutModal close={close} />;
            case ModalList.DeleteCampaignModal:
                return <DeleteConfirmModal close={close} {...rest} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const HamBergerElement = document.getElementById('hamberger');
        if (HamBergerElement?.style) {
            if (open) {
                // set hamberger index to negitive
                HamBergerElement.style.zIndex = '1';
            } else {
                // set positive index
                HamBergerElement.style.zIndex = '20';
            }
        }
    }, [open, modalType]);

    return (
        <Popup
            modal
            open={open}
            closeOnDocumentClick={false}
            onClose={() => onClose(false)}
            contentStyle={modalStyle}
        >
            {(close) => (
                <>
                    <Header>
                        <Title>{modalType}</Title>
                        <Icon
                            icon={Icons.TimesCircleSolid}
                            onClick={() => close()}
                            size={15}
                        />
                    </Header>
                    {renderModal(modalType, close)}
                </>
            )}
        </Popup>
    );
}
